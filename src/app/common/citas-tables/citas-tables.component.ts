import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../Service/api.service';
import { getCitasModel } from 'src/app/models/getCita.model';
import {SessionService} from 'src/app/authentication/session.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

declare var $: any; // Agrega esto arriba de la clase

@Component({
  selector: 'app-citas-tables',
  templateUrl: './citas-tables.component.html',
  styleUrls: ['./citas-tables.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class CitasTablesComponent implements OnInit {

  displayedColumns: string[] = ['address', 'professionalName', 'memberName', 'serviceName', 'appointmentStatus','Hora', 'Fecha', 'actions'];
  dataSource = new MatTableDataSource<getCitasModel>();
  document: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  selectedAppointmentId: number | null = null;

  constructor(
    private apiService: ApiService,
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
    private router: Router ) {}

  ngOnInit(): void {
    if (!this.sessionService.isLoggedIn()) {
      this.showMessage('Por favor, inicia sesión para ver tus citas.');
      this.router.navigate(['/']);
      return;
    }
    if (!this.sessionService.isAdmin()) {
      this.document = Number(this.sessionService.getItem('documnent'));
      this.apiService.GetCitas(this.document).subscribe(data => {      
        this.dataSource.data = data;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      });
    }else{
      this.apiService.GetCitas().subscribe(data => {      
        this.dataSource.data = data;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      });
    }
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['custom-snackbar']
    });
  }

  cancelAppoiment(id: number) {
    this.apiService.cancelCita(id).subscribe({
      next: (response) => {
        this.showMessage(response.message);
        this.ngOnInit();
      }
    });
  }

  openModal(id: number) {
    this.selectedAppointmentId = id;
    $('#exampleModal').modal('show');
  }

  closeModal() {
    $('#exampleModal').modal('hide');
  }

  confirmCancel() {
    if (this.selectedAppointmentId !== null) {
      this.cancelAppoiment(this.selectedAppointmentId);
      this.selectedAppointmentId = null;
      $('#exampleModal').modal('hide');
    }
  }
}

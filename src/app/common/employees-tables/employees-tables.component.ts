import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../Service/api.service';
import { EmployeeEditModalComponent } from '../employee-edit-modal/employee-edit-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employees-tables',
  templateUrl: './employees-tables.component.html',
  styleUrls: ['./employees-tables.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ]
})

export class EmployeesTablesComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'PrimerApellido', 'SegundoApellido', 'Telefono',
  'Documento', 'Correo','UltimoTituloProfesional', 'CampoDeProfundizacion', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private apiService: ApiService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  private showResult(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      panelClass: ['custom-snackbar']
    });
  }


  ngOnInit(): void {
    // this.apiService.GetEmpleados().subscribe(data => {
    //   this.dataSource.data = data;      
    //   if (this.paginator) {
    //     this.dataSource.paginator = this.paginator;
    //   }
    //   if (this.sort) {
    //     this.dataSource.sort = this.sort;
    //   }
    // });
  }

  startEdit(employee: any): void {
    const dialogRef = this.dialog.open(EmployeeEditModalComponent, {
      panelClass: 'custom-dialog-container',
      data: { 
        IdEmpleado: employee.IdEmpleado,
        Nombre: employee.Nombre,
        PrimerApellido: employee.PrimerApellido,
        SegundoApellido: employee.SegundoApellido,
        Telefono: employee.Telefono,
        Documento: employee.Documento,
        Correo: employee.Correo,
        CampoDeProfundizacion: employee.CampoDeProfundizacion,
        UltimoTituloProfesional : employee.UltimoTituloProfesional
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.updateEmpleado(result).subscribe({
          next: (response) => {
            this.showResult(response.Message);
            this.ngOnInit();
          },
          error: (error) => {
            console.error(error);
            let errorMessage = "An error occurred";
            if (error.error) {
              try {
                const errorObj = JSON.parse(error.error);
                errorMessage = errorObj.message || errorMessage;
              } catch (e) {
                errorMessage = error.message;
              }
            }
            this.showResult(errorMessage);
          }
        });
      }
    });    
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Professional } from 'src/app/models/professionalsModel';
import { ApiService } from '../../Service/api.service';
import { Router } from '@angular/router';
import {SessionService} from '../../authentication/session.services';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule
  ],
})

export class ProfesionalesComponent implements OnInit {
  constructor(
    private ApiService: ApiService,
    private router: Router,
    private SessionService : SessionService,
    private snackBar: MatSnackBar){}

  datos: Professional[] = [];
  ngOnInit() {
    this.datos = [];
    if (sessionStorage.getItem('serviceId') !== null) {
      let serviceId = Number(sessionStorage.getItem('serviceId'));
      this.ApiService.getProfessionals(serviceId).subscribe(
        (data: any) => {
          this.datos = data;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }else{
      this.ApiService.getProfessionals().subscribe(
        (data: Professional[]) => {
          this.datos = data;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  saveProfesionalSelected(profesionalSelected: Professional) {
    if(!this.SessionService.isLoggedIn()){
      this.showError('Inicia sesión para continuar');
      this.router.navigate(['/login']);
      return;
    }
    sessionStorage.setItem('profesionalId', profesionalSelected.document.toString());
    sessionStorage.setItem('profesionalName',profesionalSelected.name + " " + profesionalSelected.lastName);
    sessionStorage.setItem('profesionalImage', profesionalSelected.photo);
    sessionStorage.setItem('profesionaltype', profesionalSelected.fieldsOfStudy);
    sessionStorage.setItem('ProfesionalAddress', profesionalSelected.address);
    if (sessionStorage.getItem('serviceId') !== null) {
        this.router.navigate(['/calendario']);
    }else{
      this.router.navigate(['/servicios']);
    }
  }

   private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      panelClass: ['custom-snackbar']
    });
  }

}

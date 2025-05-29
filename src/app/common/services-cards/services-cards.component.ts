import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ServiceListModel } from './../../models/servicesListModel';
import { ApiService } from './../../Service/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/authentication/session.services';

@Component({
  selector: 'app-services-cards',
  templateUrl: './services-cards.component.html',
  styleUrls: ['./services-cards.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule
  ],
  animations:[
    trigger('Entrada',[
      state('void',style({
        transform: 'translateX(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(700,style({
          transform:'translateX(0)',
          opacity:1
        }))
      ])
    ])
  ]
})


export class ServicesCardsComponent implements OnInit {
  datos: ServiceListModel[] | undefined;
  
  constructor(
    private ApiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private SessionService: SessionService,
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('profesionalId') !== null) {
      let profesionalId = Number(sessionStorage.getItem('profesionalId'));
      this.ApiService.GetServicios(profesionalId).subscribe(
        (data: ServiceListModel[]) => {
          this.datos = data;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }else{
      this.ApiService.GetServicios().subscribe(
        (data: ServiceListModel[]) => {
          this.datos = data;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }

  guardarIdService(serviceSelected: ServiceListModel) {
    if(!this.SessionService.isLoggedIn()){
      this.showError('Inicia sesión para continuar');
      this.router.navigate(['/login']);
      return;
    }
    sessionStorage.setItem('serviceId', serviceSelected.serviceID.toString());
    sessionStorage.setItem('serviceName', serviceSelected.serviceName);
    sessionStorage.setItem('servicePrice', serviceSelected.cost.toString());
    if (sessionStorage.getItem('profesionalId') !== null) {
        this.router.navigate(['/calendario']);
    }else{
      this.router.navigate(['/profesionales']);
    }
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      panelClass: ['custom-snackbar']
    });
  }

  

}

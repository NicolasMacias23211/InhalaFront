import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ServiceListModel } from './../../models/servicesListModel';
import { ApiService } from './../../Service/api.service';

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
  
  constructor(private ApiService: ApiService) { }

  ngOnInit() {
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

import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
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
    ]),
    trigger('Entrada2',[
      state('void',style({
        transform: 'translateX(100%)',
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
export class ServiciosComponent {


}

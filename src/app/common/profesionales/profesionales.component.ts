import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Professional } from 'src/app/models/professionalsModel';
import { ApiService } from '../../Service/api.service';

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

  constructor(private ApiService: ApiService){}

  datos: Professional[] = [];

  ngOnInit() {
    this.ApiService.getProfessionals().subscribe(
      (data: Professional[]) => {
        this.datos = data;
        console.log(this.datos);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}

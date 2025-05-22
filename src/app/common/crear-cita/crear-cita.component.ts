import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Cita } from 'src/app/models/cita.model';

export interface DialogData {
  errorMessage: string;
}

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class CrearCitaComponent implements OnInit {
  citaInfo: Cita
  tipoServicioOptions = [
    { value: true, label: "A domicilio" },
    { value: false, label: "En establecimiento del profesional" },
  ]

  constructor(private router: Router) {
    // Datos de ejemplo - normalmente vendrían de un servicio
    this.citaInfo = {
      profesional: "Dr. Carlos Rodríguez",
      profesion: "Estilista profesional",
      imagenProfesional: "https://randomuser.me/api/portraits/men/36.jpg",
      servicio: "Corte de cabello y barba",
      esDomicilio: true,
      valor: 45000,
      fecha: "2025-05-25",
      horaInicio: "14:30",
      horaFin: "15:30",
      direccion: "Calle 123 #45-67, Apto 502",
      calendarData: null
    }
  }

  ngOnInit(): void {}

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  formatValor(valor: number): string {
    return valor.toLocaleString("es-CO")
  }

  onTipoServicioChange(event: any): void {
    this.citaInfo.esDomicilio = event.target.value === "true"
  }

  finalizarProceso(): void {
    // Redireccionar al home
    this.router.navigate(["/"])
  }
}

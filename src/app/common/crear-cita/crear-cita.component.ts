import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { CalendarEvent } from 'src/app/models/calendarEventModel';
import { Cita } from 'src/app/models/cita.model';
import {MatSelectModule} from '@angular/material/select';
import { createCitaModel } from 'src/app/models/createCitaModel';
import { ApiService } from 'src/app/Service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatSelectModule
  ],
})

export class CrearCitaComponent implements OnInit {
  citaInfo: Cita
  comentario: string = '';
  DireccionUser : string | null = sessionStorage.getItem('UserAddress') ?? '';
  fechaFinal: string = (sessionStorage.getItem('scheduleDate') ?? '').replace(/^"(.*)"$/, '$1');
  Cita : createCitaModel | null = null;
  weekDays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
  weekDates: number[] = [];
  tipoServicioOptions = [
    { value: true, label: "A domicilio" },
    { value: false, label: "En establecimiento del profesional" },
  ]

  constructor(
    private router: Router,
    private api: ApiService,
    private snackBar: MatSnackBar,
    ) {
    
    this.citaInfo = {
      profesional: sessionStorage.getItem("profesionalName") ?? "",
      profesion: sessionStorage.getItem("profesionaltype") ?? "",
      imagenProfesional: sessionStorage.getItem("profesionalImage") ?? "",
      servicio: sessionStorage.getItem("serviceName") ?? "",
      esDomicilio: true,
      valor: sessionStorage.getItem("servicePrice") ?? "",
      direccionUsuario: this.DireccionUser ? this.DireccionUser.replace(/^"(.*)"$/, '$1') : "",
      direccionProfesional : sessionStorage.getItem("ProfesionalAddress") ?? "",
      date: new Date(sessionStorage.getItem("scheduleDate") ?? ""),
      calendarData: JSON.parse(sessionStorage.getItem("scheduleEvent")!) as CalendarEvent,
    }
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("profesionalId") === null || sessionStorage.getItem("serviceName") === null) {
        this.showMessage('No se ha seleccionado un profesional o servicio.');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000); 
    }
    const today = new Date()
    const firstDayOfWeek = new Date(today)
    const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay()
    firstDayOfWeek.setDate(today.getDate() - (dayOfWeek - 1))
    this.weekDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(firstDayOfWeek)
      d.setDate(firstDayOfWeek.getDate() + i)
      return d.getDate()
    })
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  onTipoServicioChange(event: any): void {
    this.citaInfo.esDomicilio = event.target.value === "true"
  }
  //TODO: terminar el objeto de la cita
  finalizarProceso(): void {
    this.Cita = {
      addres: this.getAddress(),
      notes: this.comentario,
      date: this.fechaFinal,
      isHomeService: this.citaInfo.esDomicilio,
      UserDocumentId: Number(sessionStorage.getItem("document")),
      sheduleId: Number(sessionStorage.getItem("scheduleId")),
      ServiceId: Number(sessionStorage.getItem("serviceId")),
      ProfessionalId: Number(sessionStorage.getItem("profesionalId")),
    }
    this.api.CreateNewCita(this.Cita).subscribe(data => {
      if (data) {
        //this.showMessage(data.message);
        //this shoeld be a assynck operation
        //TODO: llamar a la API para eliminar el evento del calendario
        // setTimeout(() => {
        //   this.router.navigate(['/mis_citas']);
        // }, 1000);
      }
    });
    this.router.navigate(['/mis_citas']);
  }

  parseTime(timeString: string): Date {
    const [hours, minutes, seconds] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(parseInt(seconds, 10));
    return date;
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['custom-snackbar']
    });
  }

  getAddress(): string {
    if(this.citaInfo.esDomicilio === true){
      return (this.citaInfo.direccionUsuario).replace(/^"(.*)"$/, '$1');;

    }else{
      return (this.citaInfo.direccionProfesional).replace(/^"(.*)"$/, '$1');;
    }
  }

}

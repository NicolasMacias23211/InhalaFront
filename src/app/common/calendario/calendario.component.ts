import { Component } from "@angular/core";
import { ApiService } from 'src/app/Service/api.service';
import { CalendarEvent } from './../../models/calendarEventModel';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {SessionService} from 'src/app/authentication/session.services';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  isLoaded = false
  showAIPopup = false
  typedText = ""
  isPlaying = false
  currentView = "week"
  currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
  currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' })
  selectedEvent: CalendarEvent | null = null


  // Calendar data
  weekDays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
  weekDates: number[] = []

    // ...rest of your ngOnInit code...
  timeSlots = Array.from({ length: 13 }, (_, i) => i + 8) 

  // Mini calendar
  daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
  firstDayOffset = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay()
  miniCalendarDays: (number | null)[] = []

  events: CalendarEvent[] = []

  constructor(
    private ApiService: ApiService,
    private snackBar: MatSnackBar, 
    private router: Router,
    private sessionService: SessionService) {}

  ngOnInit(): void {
    const today = new Date()
    const firstDayOfWeek = new Date(today)
    const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay()
    firstDayOfWeek.setDate(today.getDate() - (dayOfWeek - 1))
    this.weekDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(firstDayOfWeek)
      d.setDate(firstDayOfWeek.getDate() + i)
      return d.getDate()
    })
    if(sessionStorage.getItem("profesionalId") !== null && this.sessionService.isLoggedIn()){
      this.ApiService.getSheduleUser(Number(sessionStorage.getItem("profesionalId"))).subscribe(
        (data) => {
          this.events = data || [];
          console.log(this.events);
        },
        (error) => {
          console.error(error);
        }
      );
    }else{
      this.showError('Porfavor selecciona un profesional antes de validar el calendario');
      setTimeout(() => {
        this.router.navigate(['/profesionales']);
      }, 4000); 
    }

    this.miniCalendarDays = Array.from({ length: this.daysInMonth + this.firstDayOffset }, (_, i) =>
      i < this.firstDayOffset ? null : i - this.firstDayOffset + 1,
    )

    setTimeout(() => {
      this.isLoaded = true
    }, 0)

    setTimeout(() => {
      this.showAIPopup = true
      this.typeText()
    }, 3000)
  }

  typeText(): void {
    const text =
      "por favor selecciona algunos de los espacios disponibles para agendar una cita con el especialista"
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        this.typedText += text.charAt(i)
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)
  }

  handleEventClick(event: CalendarEvent): void {
    this.selectedEvent = event
  }

  calculateEventStyle(startTime: string, endTime: string): any {
    const start = Number.parseInt(startTime.split(":")[0]) + Number.parseInt(startTime.split(":")[1]) / 60
    const end = Number.parseInt(endTime.split(":")[0]) + Number.parseInt(endTime.split(":")[1]) / 60
    const top = (start - 8) * 80
    const height = (end - start) * 80
    return { top: `${top}px`, height: `${height}px` }
  }

  getEventsForDay(dayIndex: number): CalendarEvent[] {
    return this.events.filter((event) => event.days_dayID === dayIndex + 1)
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['custom-snackbar']
    });
  }

  reservarCita(event: CalendarEvent): void {
    const diaSemana = this.weekDays[event.days_dayID - 1]; // Ej: "Lunes"
    const diaMes = this.weekDates[event.days_dayID - 1];   // Ej: 19
    const mesYAnio = this.currentMonth;                    // Ej: "mayo de 2025"
    const horaInicioStr = event.startTime;                 // Ej: "08:00:00"

    // Extraer mes y año
    const [mesTexto, , anio] = mesYAnio.split(' '); // ["mayo", "de", "2025"]
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const mes = meses.indexOf(mesTexto.toLowerCase());

    // Extraer hora y minutos
    const [hora, minuto] = horaInicioStr.split(':').map(Number);

    // Crear el objeto Date
    const eventDate = new Date(Number(anio), mes, Number(diaMes), hora, minuto);

    const now = new Date();
    if (eventDate < now) {
      this.showError('No puedes reservar una cita en una fecha y hora que ya pasó.');
      return;
    }
    const IdSelectd = event.scheduleId;
    this.sessionService.setItem('scheduleEvent', event);
  }
}


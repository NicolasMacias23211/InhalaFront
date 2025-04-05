import { Component } from "@angular/core";
import { ApiService } from 'src/app/Service/api.service';
import { CalendarEvent } from './../../models/calendarEventModel';

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
  currentMonth = "March 2025"
  currentDate = "March 5"
  selectedEvent: CalendarEvent | null = null


  // Calendar data
  weekDays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
  weekDates = [3, 4, 5, 6, 7, 8, 9,10]
  timeSlots = Array.from({ length: 13 }, (_, i) => i + 8) 

  // Mini calendar
  daysInMonth = 31
  firstDayOffset = 5 // Friday is the first day of the month in this example
  miniCalendarDays: (number | null)[] = []

  events: CalendarEvent[] = []

  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.ApiService.getSheduleUser(100748100).subscribe(
      (data) => {
        this.events = data || [];
        console.log(this.events);
      },
      (error) => {
        console.error(error);
      }
    );
    this.miniCalendarDays = Array.from({ length: this.daysInMonth + this.firstDayOffset }, (_, i) =>
      i < this.firstDayOffset ? null : i - this.firstDayOffset + 1,
    )

    // Animation and popup timing
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
    const top = (start - 8) * 80 // 80px per hour
    const height = (end - start) * 80
    return { top: `${top}px`, height: `${height}px` }
  }

  getEventsForDay(dayIndex: number): CalendarEvent[] {
    return this.events.filter((event) => event.days_dayID === dayIndex + 1)
  }
}


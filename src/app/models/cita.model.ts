import { CalendarEvent } from "./calendarEventModel"

export interface Cita {
  profesional: string
  profesion: string
  imagenProfesional: string
  servicio: string
  esDomicilio: boolean
  valor: string
  direccionUsuario: string
  date : Date
  direccionProfesional: string
  calendarData: CalendarEvent
}

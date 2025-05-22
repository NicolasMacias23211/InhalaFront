import { CalendarEvent } from "./calendarEventModel"

export interface Cita {
  profesional: string
  profesion: string
  imagenProfesional: string
  servicio: string
  esDomicilio: boolean
  valor: number
  fecha: string
  horaInicio: string
  horaFin: string
  direccion: string
  calendarData: CalendarEvent | null //por ahora se deja que pueda se null para ajustarlo
}

export interface CalendarEvent {
    scheduleId: number
    title: string
    startTime: string
    endTime: string
    color: string 
    days_dayID: number
    description: string
    location: string
    attendees: string[]
    organizer: string,
    available: boolean,
    member_document: number,
  }
  
  
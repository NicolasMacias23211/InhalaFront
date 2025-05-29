export interface getCitasModel {
  scheduledAppointmentID: number;
  address: string;
  notes: string;
  isHomeService: number;
  MembersDocument: number;
  memberName: string;
  memberLastName: string;
  professionalDocument: number;
  professionalName: string;
  professionalLastName: string;
  schedule_scheduleId: number;
  startTime: string;
  endTime: string;
  appointmentStatus: string;
  appointmentStatusDescription: string;
  serviceID: number | null;
  serviceName: string;
  serviceDescription: string;
  appointmentByServicesPackagesID: number | null;
}
export interface ServiceListModel {
  serviceID: number; 
  serviceName: string; 
  serviceDescription?: string; 
  cost: number; 
  duration: string; 
  uniqueService: boolean;
  fieldOfStudyID: number;
  nameFieldStudy: string;
}
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ServiceListModel} from '../models/servicesListModel';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { CalendarEvent } from '../models/calendarEventModel';
import { Professional } from '../models/professionalsModel';
import { LoginResponseModel } from '../models/loginModel';
import { LoggedUserData } from '../models/loggedUserData.model';
import { createCitaModel } from '../models/createCitaModel';
import { genericModel } from '../models/generic.model';
import { getCitasModel } from '../models/getCita.model';


@Injectable({
  providedIn: 'root'
})
//TODO: los tipos de datos ANY en los metodos de la clase ApiService deben ser
//TODO: cambiados por los tipos de datos correctos creando su interfaz respectiva
export class ApiService {

  private API_URL = environment.API_URL;

  readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http:HttpClient) { }  

  login(email: string, password: string): Observable<LoginResponseModel> {
    const body = { userName: email, password: password };
    return this.http.post<LoginResponseModel>(`${this.API_URL}/autenticacion`, body,{ headers: this.headers });
  }

  CreateNewCustomer(json : any): Observable<any> {
    const body = json;
    return this.http.post(`${this.API_URL}/createMember`, body,{ headers: this.headers });
  }

  CreateNewCita(data : createCitaModel): Observable<genericModel> {
    const body = data;
    return this.http.post<genericModel>(`${this.API_URL}/createAppointment`, body,{ headers: this.headers });
  }

  getProfessionals(serviceId?: number): Observable<Professional[]> {
    let params = new HttpParams();
    if (serviceId) {
      params = params.set('serviceID', serviceId);
    }
    return this.http.get<Professional[]>(this.API_URL + '/professionals', { params,headers: this.headers });
  }

  GetServicios(profesionalId?: number):Observable<ServiceListModel[]>{
    let params = new HttpParams();
    if (profesionalId) {
      params = params.set('profesionalId', profesionalId);
    }
    return this.http.get<ServiceListModel[]>(`${this.API_URL}/servicios`, { params,headers: this.headers });
  }

  GetCitas(userID?: number):Observable<getCitasModel[]>{
    let params = new HttpParams();
    if (userID) {
      params = params.set('customerID', userID);
    }
    return this.http.get<getCitasModel[]>(`${this.API_URL}/appointments`,{ params,headers: this.headers });
  }
  
  updateEmpleado(empleado: any): Observable<any> {
    return this.http.put(`${this.API_URL}/empleados`, empleado,{ headers: this.headers });
  }

  GetUsuarios():Observable<any>{
    return this.http.get(`${this.API_URL}/users`,{ headers: this.headers });
  }

  getSheduleUser(profesionalId : number):Observable<CalendarEvent[]>{
    return this.http.get<CalendarEvent[]>(`${this.API_URL}/schedule/${profesionalId}`,{ headers: this.headers});
  }

  getMembersByDocument(memberDocumnet: number): Observable<LoggedUserData> {
    return this.http.get<LoggedUserData>(this.API_URL + `/members/${memberDocumnet}`, { headers: this.headers });
  }

  cancelCita(appointmentId: number): Observable<genericModel> {
    return this.http.delete<genericModel>(`${this.API_URL}/appointments/${appointmentId}`, { headers: this.headers });
  }

}


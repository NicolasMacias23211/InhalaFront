import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ServiceListModel} from '../models/servicesListModel';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { CalendarEvent } from '../models/calendarEventModel';
import { Professional } from '../models/professionalsModel';


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

  login(email: string, password: string): Observable<any> {
    const body = { userName: email, password: password };
    return this.http.post(`${this.API_URL}/autenticacion`, body,{ headers: this.headers });
  }

  CreateNewCustomer(json : any): Observable<any> {
    const body = json;
    return this.http.post(`${this.API_URL}/createNewUser`, body,{ headers: this.headers });
  }

  CreateNewCita(json : any): Observable<any> {
    const body = json;
    return this.http.post(`${this.API_URL}/CreateNewCita`, body,{ headers: this.headers });
  }

  getProfessionals():Observable<Professional[]>{
    return this.http.get<Professional[]>(`${this.API_URL}/professionals`,{ headers: this.headers });
  }

  GetServicios():Observable<ServiceListModel[]>{
    return this.http.get<ServiceListModel[]>(`${this.API_URL}/servicios`,{ headers: this.headers });
  }

  GetCitas():Observable<any>{
    return this.http.get(`${this.API_URL}/citas`,{ headers: this.headers });
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

}


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ServiceListModel} from '../models/servicesListModel';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { CalendarEvent } from '../models/calendarEventModel';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  private API_URL = environment.API_URL;

  login(email: string, password: string): Observable<any> {
    const body = { userName: email, password: password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post(`${this.API_URL}/autenticacion`, body,{ headers: headers });
  }

  CreateNewCustomer(json : any): Observable<any> {
    const body = json;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post(`${this.API_URL}/createNewUser`, body,{ headers: headers });
  }

  CreateNewCita(json : any): Observable<any> {
    const body = json;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post(`${this.API_URL}/CreateNewCita`, body,{ headers: headers });
  }

  GetEmpleados():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get(`${this.API_URL}/empleados`,{ headers: headers });
  }

  GetServicios():Observable<ServiceListModel[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get<ServiceListModel[]>(`${this.API_URL}/servicios`,{ headers: headers });
  }

  GetCitas():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get(`${this.API_URL}/citas`,{ headers: headers });
  }
  
  updateEmpleado(empleado: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.put(`${this.API_URL}/empleados`, empleado,{ headers: headers });
  }


  GetUsuarios():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get(`${this.API_URL}/users`,{ headers: headers });
  }

  getSheduleUser(profesionalId : number):Observable<CalendarEvent[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get<CalendarEvent[]>(`${this.API_URL}/schedule/${profesionalId}`,{ headers: headers });
  }

}


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list'; 
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FootherComponent } from './main/foother/foother.component';
import { HeaderComponent } from './main/header/header.component';
import { RegistroComponent } from './main/registro/registro.component';
import { HomeComponent } from './main/home/home.component';
import { PasosDeRegistroComponent } from './common/pasos-de-registro/pasos-de-registro.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './main/login/login.component';
import { ServiciosComponent } from './main/servicios/servicios.component';
import { MisionComponent } from './main/mision/mision.component';
import { VisionComponent } from './main/vision/vision.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginContentComponent } from './common/login-content/login-content.component';
import { HomeBodyComponent } from './common/home-body/home-body.component';
import { EmpleadosComponent } from './main/empleados/empleados.component';
import { CalendarioComponent } from './common/calendario/calendario.component';
import { DatePipe } from '@angular/common';
import { ServicesCardsComponent } from './common/services-cards/services-cards.component';
import { CitaComponent } from './main/cita/cita.component';
import { CrearCitaComponent } from './common/crear-cita/crear-cita.component';
import { UsersTablesComponent } from './common/users-tables/users-tables.component';
import { AdminsViewsComponent } from './main/admins-views/admins-views.component';
import { CitasTablesComponent } from './common/citas-tables/citas-tables.component';
import { ProfesionalesComponent } from './common/profesionales/profesionales.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeesTablesComponent } from './common/employees-tables/employees-tables.component';
import { EmployeeEditModalComponent } from './common/employee-edit-modal/employee-edit-modal.component';
import { CarouselComponent } from './common/image-carrusel/image-carrusel.component';

@NgModule({
  declarations: [
    AppComponent,
    FootherComponent,
    HeaderComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    ServiciosComponent,
    MisionComponent,
    VisionComponent,
    EmpleadosComponent,
    CalendarioComponent,
    CitaComponent,
    AdminsViewsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    EmployeesTablesComponent,
    EmployeeEditModalComponent,
    ProfesionalesComponent,
    CitasTablesComponent,
    ServicesCardsComponent,
    HomeBodyComponent,
    CrearCitaComponent,
    AppRoutingModule,
    MatButtonToggleModule,
    UsersTablesComponent,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    PasosDeRegistroComponent,
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    LoginContentComponent,
    CarouselComponent
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
  panelOpenState = false;
 }

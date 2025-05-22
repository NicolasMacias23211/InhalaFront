import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsViewsComponent } from './main/admins-views/admins-views.component';
import { CitaComponent } from './main/cita/cita.component';
import { EmpleadosComponent } from './main/empleados/empleados.component';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';
import { MisionComponent } from './main/mision/mision.component';
import { RegistroComponent } from './main/registro/registro.component';
import { VisionComponent } from './main/vision/vision.component';
import { ServiciosComponent } from './main/servicios/servicios.component';
import { CalendarioComponent } from '@common/calendario/calendario.component';

const Routes: Routes = [
  {
    path: '', 
    component:HomeComponent
  },
  {
    path: 'registro', 
    component:RegistroComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'vision',
    component: VisionComponent
  },
  {
    path: 'mision',
    component: MisionComponent
  },
  {
    path: 'servicios',
    component: ServiciosComponent
  },
  {
    path: 'cita',
    component: CitaComponent
  },
  {
    path: 'admin',
    component: AdminsViewsComponent
  },
  {
    path: 'calendario',
    component: CalendarioComponent
  },
  {
    path : 'profesionales',
    component : EmpleadosComponent
  },
  {
    path: '**',
    component:HomeComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

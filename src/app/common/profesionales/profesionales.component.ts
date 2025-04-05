import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { AuthService } from '../../authentication/AuthService/auth-service.service';
import { ApiService } from '../../Service/api.service';
import { CalendarEvent } from 'src/app/models/calendarEventModel';


export interface DialogData {
  errorMessage: string;
}


@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})

export class ProfesionalesComponent implements OnInit {
  datos: CalendarEvent[] = [];
  selectedPersonId: string | null = null; 
  userId: number | null;
  constructor(
    private ApiService: ApiService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.userId = this.authService.getUserId(); 
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['custom-snackbar']
    });
  }

  ngOnInit() {
    this.ApiService.GetEmpleados().subscribe(
      (data) => {
        this.datos = data;
        console.log(this.datos);
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  seleccionarPersona(persona: any) {
    this.selectedPersonId = persona.IdEmpleado;
  }
  
}

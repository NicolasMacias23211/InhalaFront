import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/AuthService/auth-service.service';
import { ApiService } from '../../Service/api.service';

export interface DialogData {
  errorMessage: string;
}

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css'],
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
export class CrearCitaComponent implements OnInit {
  datos: any[] | undefined; 
  selectedPersonId: string | null = null; 
  firstFormGroup = this._formBuilder.group({
    
  });
  secondFormGroup = this._formBuilder.group({
    direccion: ['', Validators.required],
  });

  userId: number | null;
  @ViewChild('stepper') stepper!: MatStepper;

  citaJson: any = {};
  constructor(
    private ApiService: ApiService,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userId = this.authService.getUserId(); 
    this.secondFormGroup = this._formBuilder.group({
      direccion: ['', Validators.required]
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['custom-snackbar']
    });
  }

  ngOnInit() {
    // this.ApiService.GetEmpleados().subscribe(
    //   (data) => {
    //     this.datos = data;
    //     console.log(this.datos);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
  }

  seleccionarPersona(persona: any) {
    this.selectedPersonId = persona.IdEmpleado;
    this.stepper.next();
  }
  
  enviarFormulario() {
    if (this.selectedPersonId !== null) {
      const informacionBasica = this.secondFormGroup.value;
      const direccionControl = informacionBasica.direccion;
      if (direccionControl !== null) {
        console.log('IdEmpleado seleccionado:', this.selectedPersonId);
        console.log('Dirección:', direccionControl);
        console.log('id del usuario', this.userId)
        this.citaJson = {
          IdEmpleado: this.selectedPersonId,
          DireccionDeLaCita: direccionControl,
          IdUsuario: this.userId,
          IdEstadoDeCita: 1,
          idServicio : 1
        };
        this.ApiService.CreateNewCita(this.citaJson).subscribe(
          (data) => {
            this.datos = data;
            console.log(this.datos);
            this.router.navigate(['/admin']);
          },
          (error) => {
            let errorMessage = "An error occurred";
            console.error(error);
            if (error.error) {
              try {
                const errorObj = JSON.parse(error.error);
                errorMessage = errorObj.message || errorMessage;
              } catch (e) {
                errorMessage = error.message;
              }
            }
            this.showError(errorMessage);
          }
        );
      } else {
        console.error('El control de dirección es nulo.');
      }
    } else {
      console.error('No se ha seleccionado ninguna persona.');
    }
  }
  
}

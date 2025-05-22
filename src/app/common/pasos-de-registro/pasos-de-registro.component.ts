import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ApiService } from '../../Service/api.service';

export interface DialogData {
  errorMessage: string;
}
@Component({

  selector: 'app-pasos-de-registro',
  templateUrl: './pasos-de-registro.component.html',
  styleUrls: ['./pasos-de-registro.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  animations:[
    trigger('Entrada',[
      state('void',style({
        opacity:0
      })),
      transition(':enter',[
        animate(800,style({
          opacity:1
        }))
      ])
    ])
  ]
})
export class PasosDeRegistroComponent implements OnInit{
  isVisible: boolean = true; 
  isChecked: boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup : FormGroup;
  jsonData: any;

  ngOnInit() {}

  constructor(private _formBuilder: FormBuilder,private ApiService: ApiService, private router: Router, private datePipe: DatePipe,private snackBar: MatSnackBar) {
    
    this.firstFormGroup = this._formBuilder.group({
      Nombre: ['', Validators.required],
      PrimerApellido: ['', Validators.required],
      SegundoApellido: ['', Validators.required],
      documento:['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      Sexo: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
      Correo:['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      Dirección: ['', Validators.required],
      Ocupación: ['', Validators.required],
      RH: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      quirúrgicos: ['',Validators.required],
      Alérgicos: ['',Validators.required],
      familiares: ['',Validators.required],
      farmacológicos: ['',Validators.required],
      fumador: ['', Validators.required],
      alcohol: ['', Validators.required],
      ejercicio: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      Confirmcontraseña: ['', Validators.required]
    }, { validator: confirmPasswordValidator('contraseña', 'Confirmcontraseña') }); 
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['custom-snackbar']
    });
  }

  guardarDatos() {
    const informacionBasica = this.firstFormGroup.value;
    const informacionMedica = this.secondFormGroup.value;
    const informacionsesion = this.thirdFormGroup.value;
    const fechaNacimientoFormateada = this.datePipe.transform(informacionBasica.FechaNacimiento, 'yyyy-MM-dd');
    console.log('Fecha de nacimiento original:', informacionBasica.FechaNacimiento);
    console.log('Fecha de nacimiento formateada:', fechaNacimientoFormateada);

    this.jsonData = {
      nombre: informacionBasica.Nombre,
      primerApellido: informacionBasica.PrimerApellido,
      segundoApellido: informacionBasica.SegundoApellido,
      documento: informacionBasica.documento,
      fechaNacimiento: fechaNacimientoFormateada,
      sexo: informacionBasica.Sexo,
      correoElectronico: informacionBasica.Correo,
      telefono: informacionBasica.telefono,
      direccion: informacionBasica.Dirección,
      ocupacion: informacionBasica.Ocupación,
      rh: informacionBasica.RH,
      antecendetesQuirurgicos: informacionMedica.quirúrgicos,
      antecendetesFarmaceuticos: informacionMedica.farmacológicos,
      antecendetesToxicos: informacionMedica.Alérgicos,
      fuma: isValidBoolean(informacionMedica.fumador),
      bebe: isValidBoolean(informacionMedica.alcohol),
      ejercisio: isValidBoolean(informacionMedica.ejercicio),
      antecendetesFamiliares: informacionMedica.familiares,
      userName: informacionsesion.usuario,
      password: informacionsesion.contraseña
    };
    console.log(this.jsonData);
    this.submitLoginForm(this.jsonData);
  }

  isLinear = true;

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
  }

  submitLoginForm(JsonData: any) {
    this.ApiService.CreateNewCustomer(JsonData).subscribe({
      next: (response) => {
        let data = JSON.parse(response);
        if (data && typeof data.success === 'boolean') {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error(error);
        let errorMessage = "An error occurred";
        if (error.error) {
          try {
            const errorObj = JSON.parse(error.error);
            console.log(errorObj);
          } catch (e) {
            console.log(error);
          }
        }
        this.showError(
          "Ha ocurrido un error al crear el usuario. Por favor, verifica los datos ingresados e intenta nuevamente."
        );
      },
      complete: () => {
        console.log("Solicitud completada");
      }
    });
  }
}
  
export function confirmPasswordValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl) => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);
    if (matchingControl?.errors && !matchingControl.errors['confirmPasswordValidator']) {
      return null;
    }
    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl?.setErrors(null);
    }
    return null;
  };
}

function isValidBoolean(value: any): boolean {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return !!value;
}


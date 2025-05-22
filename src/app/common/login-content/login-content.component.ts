import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {trigger,style,transition,animate, state} from '@angular/animations'
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {ApiService} from '../../Service/api.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SessionService} from '../../authentication/session.services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.css'],
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule,MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatSnackBarModule
  ],
  animations:[
    trigger('Entrada',[
      state('void',style({
        transform: 'translateX(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(700,style({
          transform:'translateX(0)',
          opacity:1
        }))
      ])
    ]),
    trigger('Entrada2',[
      state('void',style({
        transform: 'translateX(100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(700,style({
          transform:'translateX(0)',
          opacity:1
        }))
      ])
    ])
  ]
})
export class LoginContentComponent{
  hide = true;
  LoginFrom = new FormGroup({
    email : new FormControl('', Validators.required),
    contraseña : new FormControl('',Validators.required)
  })


  userData = { username: '', password: '' };

  constructor(private ApiService: ApiService,private router: Router, private snackBar: MatSnackBar,private sessionService: SessionService) { }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      panelClass: ['custom-snackbar']
    });
  }

  submitLoginForm() {
    this.ApiService.login(this.userData.username, this.userData.password).subscribe(
      response  => {
        let data = response;
        if (data && data.id) {
          this.sessionService.setItem('isLoggedIn', true);
          this.sessionService.setDocument(data.id);
          this.router.navigate(['/servicios']);
        }
      },
      error => {
        console.error(error);
        this.showError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      }
    );
  }


  
  
  


}

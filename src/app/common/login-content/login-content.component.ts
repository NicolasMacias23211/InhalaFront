import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {trigger,style,transition,animate, state} from '@angular/animations'
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, NgForm} from '@angular/forms';
import { ApiService } from '../../Service/api.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/AuthService/auth-service.service';

@Component({
  selector: 'app-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.css'],
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule,MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule
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

  constructor(private ApiService: ApiService,private router: Router,private authService: AuthService) { }

  submitLoginForm() {
    this.ApiService.login(this.userData.username, this.userData.password).subscribe(
      response  => {
        let data = response;
        console.log(data.id);
        if (data && data.id) {
          this.authService.setUserId(data.id); // Guarda la ID del usuario
          this.router.navigate(['/cita']);
        }
      },
      error => {
        console.error(error);
      }
    );
  }


  
  
  


}

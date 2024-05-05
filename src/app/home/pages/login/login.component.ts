import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    loginForm: FormGroup;
    isLogging: boolean = false;
    error: boolean = false;
    mostrarContrasena = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                private userService: UserService) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            pass: ['', [Validators.required]]
        })
    }

    ngOnInit(): void {
    }

    togglePasswordVisibility(): void {
        this.mostrarContrasena = !this.mostrarContrasena;
    }

    getPasswordFieldType(): string {
        return this.mostrarContrasena ? 'text' : 'password';
    }



    onLoginSubmit() {
        let username = this.loginForm.get('username')?.value;
        let pass = this.loginForm.get('pass')?.value;

        if(this.loginForm.valid) {
            this.userService.login(username,pass).subscribe({
                next: (res:any) => {
                    console.log("usuario logueado");
                },
                error: (error) => {
                    console.warn("error en el logueo");
                }
            })
        }

    }

    register() {
        this.router.navigateByUrl('/register');
    }


}

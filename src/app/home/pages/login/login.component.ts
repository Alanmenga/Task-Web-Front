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
    @Input() infoMessage: string = '';
    @Input() isModal: boolean = false;

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
            this.userService.login(username,pass).subscribe( 
                (resp) => {
                    if (this.isModal) {
                      console.log("usuario logueado como ventana");
                    } else {
                      console.log("usuario logueado desde la pantalla login");
                    }
                },
                (error) => {
                    if (error.status === 401) {
                        console.log("Credenciales inválidas");
                        // Aquí puedes mostrar un mensaje de error al usuario o realizar alguna otra acción
                    } else {
                        console.error("Error en el inicio de sesión:", error);
                        // Aquí puedes manejar otros errores de manera adecuada
                    }
                }
            )
        }

    }

    register() {
        this.router.navigateByUrl('/register');
    }


}

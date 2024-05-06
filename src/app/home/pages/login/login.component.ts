import { CommonModule } from '@angular/common';
import { Component, Input, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginResponse } from '../../shared/response/login-response';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../../services/session.service';

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
                private userService: UserService,
                private sessionService: SessionService,
                @Optional() public activeModal: NgbActiveModal) {
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
                (resp: LoginResponse) => {
                    const sessionId = resp.sessionId;
                    const csrfToken = resp.csrfToken;
                    const user_id = resp.user_id;
                    sessionStorage.setItem('sessionId', sessionId)
                    sessionStorage.setItem('csrfToken', csrfToken)
                    sessionStorage.setItem('user_id', user_id.toString())
                    this.sessionService.iniciarSesion();
                    if (this.isModal) {
                      this.activeModal.close();
                    }
                    this.router.navigateByUrl('/panel');
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
        if(this.isModal){
            this.activeModal.close();
        }
        this.router.navigateByUrl('/register');
    }


}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {MatInputModule} from '@angular/material/input';
import { debounceTime } from 'rxjs';
import { noSpecialCharactersValidator } from "../../shared/validators/no-special-characters.validator";
import { lettersValidator } from '../../shared/validators/letters.validar';
import { numbersValidator } from '../../shared/validators/numbers.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, FormsModule, MatInputModule, ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

    registerForm: FormGroup;

    passError: boolean = false;
    passErrorL: boolean = false;
    registerError: boolean = false;
    errorMessage: string = '';
    sendingSubmit: boolean = false;
    isSubscription: boolean = false;
    usernameControl: FormControl;
    passwordControl: FormControl;
    userExist : boolean = false;
    genderRequided : boolean = false;
    mostrarContrasena = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                private userService: UserService) {
                this.usernameControl = new FormControl('');
                this.passwordControl = new FormControl('');
                this.registerForm = this.fb.group({
                    password: ['', [Validators.required, this.noWhitespaceValidator,noSpecialCharactersValidator, lettersValidator, numbersValidator]],
                    phone: [''],
                    age: [''],
                    gender: ['', Validators.required],
                });
    }

    ngOnInit(): void {
        this.usernameControl.valueChanges.pipe(
            debounceTime(500)
        ).subscribe((value: string) => {
            if(value.length > 0){
                this.userService.userExist(value).subscribe((resp: any) => {
                    if(resp.includes("no")){
                        this.userExist = false;
                    }else{
                        this.userExist = true;
                    }
                });
            }
        });

    }


    onRegisterSubmit() {
        let username =  this.usernameControl.value;
        let password =  this.registerForm.get('password')?.value;
        let phone: number =  this.registerForm.get('phone')?.value;
        let age  =  this.calcularEdad(this.registerForm.get('age')?.value);
        let gender =  this.registerForm.get('gender')?.value;

        (gender == "" || gender == null) ? this.genderRequided = true : this.genderRequided = false;

        if(this.registerForm.valid && this.usernameValid()){
            this.userService.register(username, password, phone, age, gender).subscribe( resp => {
                console.log("respuesta del registro --> ",resp);
            });
        }
    }

    // VALIDADOR DE CAMPOS VACÍOS
    public noWhitespaceValidator(control: FormControl) {
        const value = control.value;
        const hasWhitespace = /\s/.test(value);
        return hasWhitespace ? { 'whitespace': true } : null;
    }

    public noWhitespaceUsername() {
        const value = this.usernameControl.value;
        const hasWhitespace = /\s/.test(value);
        return hasWhitespace;
    }

    public usernameValid(){
        const user = this.usernameControl.value;
        return (!this.noWhitespaceUsername() && user.length > 0 && !this.userExist)
    }

    public passValid() {
        const pass = this.registerForm.get('password')?.value;
        const expresionRegular = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return expresionRegular.test(pass);
    }


    formatPhone(value: string): string {
        if (!value) return '';
        const numbersOnly = value.replace(/[^\d]/g, '');
        const formattedValue = numbersOnly.replace(/(\d{4})(\d{4})/, '$1-$2');
    
        return formattedValue;
    }

    togglePasswordVisibility(): void {
        this.mostrarContrasena = !this.mostrarContrasena;
    }

    getPasswordFieldType(): string {
        return this.mostrarContrasena ? 'text' : 'password';
    }

    iniciarSesion() {
        this.router.navigateByUrl('/login');
    }

    public calcularEdad(fechaNacimiento: any) {
        const fechaActual = new Date();
        const fechaNacimientoArray = fechaNacimiento.split('-');
        const anioNacimiento = parseInt(fechaNacimientoArray[0]);
        const mesNacimiento = parseInt(fechaNacimientoArray[1]);
        const diaNacimiento = parseInt(fechaNacimientoArray[2]);
    
        const anioActual = fechaActual.getFullYear();
        const mesActual = fechaActual.getMonth() + 1;
        const diaActual = fechaActual.getDate();
    
        let edad = anioActual - anioNacimiento;
    
        if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
            edad--;
        }
    
        return edad;
    }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    // @ViewChild('inputMail') inputMailRef!: ElementRef;
    @Input() isModal: boolean = false;
    // @Input() email: string;

    loginForm: FormGroup;
    @Input() infoMessage: string = '';
    isLogging: boolean = false;
    error: boolean = false;
    errorMessage: string = '';

    constructor(private fb: FormBuilder,
                private router: Router,
                // public ngb: NgbModal,
                // @Optional() private activeModal: NgbActiveModal
              ) {
                this.loginForm = this.fb.group({
            usuario: ['', [Validators.required]],
            password: ['', [Validators.required]]
        })
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            usuario: ['', [Validators.required]],
            password: ['', [Validators.required]]
        })
    }

    ngAfterViewInit() {
    }

    onLoginSubmit() {
    }

    lostPass() {
    }

    register() {
        this.router.navigateByUrl('/register');
    }


}

import { Component, Input } from '@angular/core';
import { LoginComponent } from "../../../pages/login/login.component";

@Component({
    selector: 'app-login-modal',
    standalone: true,
    templateUrl: './login-modal.component.html',
    styleUrl: './login-modal.component.css',
    imports: [LoginComponent]
})
export class LoginModalComponent {
  @Input() infoMessage: any;
}

import { Component } from '@angular/core';
import { RouterOutlet,RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "./home/components/header/header.component";
import { FooterComponent } from "./home/components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      CommonModule, 
      HttpClientModule,
      RouterOutlet, 
      RouterLink, 
      RouterLinkActive, 
      HeaderComponent, 
      FooterComponent
    ]
})
export class AppComponent {
  title = 'prueba-etc-front';
}

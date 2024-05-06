import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterLink, RouterLinkActive, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  tieneSesion: boolean = false;

  constructor( private router: Router,
               private sessionService: SessionService,
  ) {
    
  }

  ngOnInit(): void {
    let recuperarSession = sessionStorage.getItem('sessionId');
    if(recuperarSession){
      this.tieneSesion = true;
    }

    this.sessionService.tieneSesion.subscribe((loggedIn) => {
      this.tieneSesion = loggedIn;
    });
  }

  cerrarSesion(){
    sessionStorage.removeItem('sessionId');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('csrfToken');
    this.sessionService.cerrarSesion();
    this.router.navigateByUrl('/login');
  }

}

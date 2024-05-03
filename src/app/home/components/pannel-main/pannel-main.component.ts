import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-pannel-main',
    standalone: true,
    templateUrl: './pannel-main.component.html',
    styleUrl: './pannel-main.component.css',
    imports: [HeaderComponent, FooterComponent]
})
export class PannelMainComponent {

}

import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PrimeIcons} from 'primeng/api';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  @Input() display : boolean = false; 
  @Output() displayChange = new EventEmitter<boolean>();
  headerAbout : string = "About";
  aboutImg : string = "http://10.39.1.10:8082/images/reden.jpg";

  cancel()
  {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}

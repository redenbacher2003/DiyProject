import { Component } from '@angular/core';
import { MenuItem, PrimeIcons} from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
//comment addedfor git test
@Component({
  selector: 'app-leftpane',
  standalone: true,
  imports: [MenuModule, ToastModule],
  templateUrl: './leftpane.component.html',
  styleUrl: './leftpane.component.scss'
})
export class LeftpaneComponent {
  items : MenuItem[] = [];
  
  ngOnInit() {

    this.items = [
      { 
              icon : PrimeIcons.HOME,
              items: [ { label: 'New Project',
                         icon : PrimeIcons.PLUS  
                       }, 
                       { label: 'Edit',
                         icon : PrimeIcons.PENCIL
                        } 
                     ], 
              escape: false
      } 
     ]
  }
}

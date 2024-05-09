import { Component } from '@angular/core';
import { MenuItem, MenuItemCommandEvent, PrimeIcons} from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { PanelMenuModule } from 'primeng/panelmenu'
import { AboutComponent } from '../about/about.component';
//comment addedfor git test
@Component({
  selector: 'app-leftpane',
  standalone: true,
  imports: [MenuModule, ToastModule, PanelMenuModule, AboutComponent],
  templateUrl: './leftpane.component.html',
  styleUrl: './leftpane.component.scss'
})
export class LeftpaneComponent {
  items : MenuItem[] = [];
  
  displayAbout : boolean = true;

  ngOnInit() {

    this.items = [
      { 
              label : 'Home',
              icon : PrimeIcons.HOME,
              items: [ 
                      { label: 'New',
                         icon : PrimeIcons.PLUS,  
                         items : [
                          {
                            label : 'Project',
                            icon : PrimeIcons.BOX                             
                          }
                         ]
                       }, 
                       { 
                          label: 'About',
                          icon : PrimeIcons.INSTAGRAM,
                          command : (this.launchAbout) 
                       } 
                     ], 
              escape: true
               
      } 
     ]
  }

  launchAbout() { 
    this.displayAbout = true; 
  }
  

 
}

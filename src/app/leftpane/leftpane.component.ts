import { Component } from '@angular/core';
import { MenuItem, MenuItemCommandEvent, PrimeIcons} from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { PanelMenuModule } from 'primeng/panelmenu'
import { AboutComponent } from '../about/about.component';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { Project } from '../../types';
//comment addedfor git test
@Component({
  selector: 'app-leftpane',
  standalone: true,
  imports: [MenuModule, ToastModule, PanelMenuModule, AboutComponent, ProjectEditComponent],
  templateUrl: './leftpane.component.html',
  styleUrl: './leftpane.component.scss'
})
export class LeftpaneComponent {
  items : MenuItem[] = [];
  LaunchAddForm : boolean = false;
  displayAbout : boolean = false;
  project : Project = { id :  0,   
                        Name : "",
                        StartDate : "",
                        FinishDate : "",
                        addedDate : new Date().toJSON(),
                        AddedBy : "Reden",
                        thumbnail : "" };  

  ngOnInit() {
    
    this.displayAbout = false;
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
                            icon : PrimeIcons.BOX , 
                            command : ($event) => {this.launchAddProduct();}                           
                          }
                         ]
                       }, 
                       { 
                          label: 'About',
                          icon : PrimeIcons.INFO,
                          command : ($event) => { this.launchAbout();} 
                       } 
                     ], 
              escape: true
               
      } 
     ]
  }

    launchAbout() {  
     this.displayAbout = true;
   }

    launchAddProduct() {
       this.LaunchAddForm = true;
    }
  
    private formatDate(dateInput : string) {
      return dateInput.substring(0,4) + "-" + dateInput.substring(5,7) + "-" + dateInput.substring(8,10) ;  
     }
 
}

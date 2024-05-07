import { Component, Output, EventEmitter, NgModule} from '@angular/core';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { NgFor, NgIf } from '@angular/common';
import { Project } from '../../types';
import { ProjectsService } from '../projects.service';
import { Projects } from '../../types';
import { CarouselModule } from 'primeng/carousel';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, NgModel } from '@angular/forms';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { ProjectMaterialEditComponent } from '../project-material-edit/project-material-edit.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ProjectItemComponent, NgFor, CarouselModule, HttpClientModule, InputTextModule, ButtonModule, FormsModule, NgIf, ProjectEditComponent, ProjectMaterialEditComponent],
  providers :[ProjectsService],
  templateUrl: './project.component.html',  
  styleUrl: './project.component.scss'
})


export class ProjectComponent {
  hidePaginator = true;
  projectItems : Project[] = []; 
  project! : Project;
  searchValue : string = "";
  displayPopup : boolean = false;
  editProjectHeader : string = "Edit Project"; 
  carouselResponsiveOptions : any[] = [
  {
       
        numVisible: 6, 
        numScroll: 5
  } 
]
  constructor(private projectsService: ProjectsService) {}

  @Output() public SelectProjectFromParent: EventEmitter<Project> = new EventEmitter();


  ngOnInit() {  
    this.fetchProjects();
  }

    fetchProjects() {
      this.projectsService 
      .getProjects()
      .subscribe(
                  (projects : any) => {
                                            this.projectItems = projects;
                                      }     
                                          
                );     
    }

    SearchProject(svalue : any){
      this.fetchProjects()
      console.log(this.searchValue);
    }

  public onSelected(fromChildProject: Project) : void {
    this.project = fromChildProject;
    this.SelectProjectFromParent.emit(this.project);
 }

  public onEdit(fromChildProject : Project) : void {
    this.project = fromChildProject;
    this.SelectProjectFromParent.emit(this.project);
  }


  toggleEditPopup(project : Project){
    this.project = project;
    this.displayPopup = true; 
  }
 
}
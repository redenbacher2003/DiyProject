import { Component, Output, EventEmitter, NgModule } from '@angular/core';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { NgFor, NgIf } from '@angular/common';
import { Project } from '../../types';
import { ProjectsService } from '../projects.service';
import { CarouselModule } from 'primeng/carousel';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, NgModel } from '@angular/forms';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { ProjectMaterialEditComponent } from '../project-material-edit/project-material-edit.component';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    ProjectItemComponent,
    NgFor,
    CarouselModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    NgIf,
    ProjectEditComponent,
    ProjectMaterialEditComponent,
    GalleryComponent
  ],
  providers: [ProjectsService],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  hidePaginator = true;
  projectItems: Project[] = [];
  project!: Project;
  searchValue: string = '';
  displayPopup: boolean = false;
  displayGallery : boolean = false;
  editProjectHeader: string = 'Edit Project';
  carouselResponsiveOptions: any[] = [
    {
      numVisible: 6,
      numScroll: 5,
    },
  ];
  constructor(private projectsService: ProjectsService) {}

  @Output() public SelectProjectFromParent: EventEmitter<Project> =
    new EventEmitter();

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectsService.getProjects().subscribe((projects: Project[]) => {
      this.projectItems = projects;
    });
  }

  SearchProject(svalue: string) {
    this.fetchProjects();
    if (svalue == '') {
      this.fetchProjects();
    } else {
      this.projectItems = this.projectItems.filter((p) =>
        p.Name.toLowerCase().includes(svalue.toLowerCase())
      );
      console.log(svalue.toLowerCase());
    }
  }

  public onSelected(fromChildProject: Project): void {
    this.project = fromChildProject;
    this.SelectProjectFromParent.emit(this.project);
  }

  public onEdit(fromChildProject: Project): void {
    this.project = fromChildProject;
    this.SelectProjectFromParent.emit(this.project);
  }

  toggleEditPopup(project: Project) {
    this.project = project;
    this.displayPopup = true;
  }

  toggleGallery(project: Project) {
    this.project = project;   
    this.displayGallery = true; 
  }
}

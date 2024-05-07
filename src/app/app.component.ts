import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftpaneComponent } from './leftpane/leftpane.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { Project } from '../types';
import { ProjectsService } from './projects.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeftpaneComponent, ProjectComponent, ProjectDetailComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private projectsService: ProjectsService){}

  title = 'DiyProject';
  project! : Project; 

  onProjectSelect(projectFromComponent: Project) : void {
    this.project = projectFromComponent;
  }
}
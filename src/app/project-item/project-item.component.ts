import { Component, Input, Output, ChangeDetectorRef } from '@angular/core';
import { Project } from '../../types';
import { ButtonModule } from 'primeng/button';
import { ProjectsService } from '../projects.service';
import { EventEmitter } from '@angular/core';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [ButtonModule, ProjectEditComponent],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
})
export class ProjectItemComponent {
  constructor(private cd: ChangeDetectorRef) {}

  title = 'awesome';
  srcImage: string = '';

  @Input() project!: Project;
  @Output() public SelectedProject: EventEmitter<Project> = new EventEmitter();
  @Output() public editProject: EventEmitter<Project> = new EventEmitter();
  displayPopup: boolean = false;

  ngOnInit() {
    this.srcImage = !this.project.thumbnail
      ? ''
      : 'http://10.39.1.10:8082/' + this.project.thumbnail;
  }

  selectProject(action: string) {
    if (action === 'view') {
      this.SelectedProject.emit(this.project);
    } else {
      this.editProject.emit(this.project);
    }

    console.log(action);
  }
}

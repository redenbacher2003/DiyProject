import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  NgModel,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Project } from '../../types';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectsService } from '../projects.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ValidationErrors, ValidatorFn, Validator } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    CalendarModule,
    FormsModule,
    InputTextModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss',
})
export class ProjectEditComponent {
  constructor(private projectsService: ProjectsService, private confirmationService: ConfirmationService) {}

  @Input() project!: Project;
  @Input() display: boolean = false;
  @Input() header!: string;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() projectChange = new EventEmitter<Project>();

  isEdit: boolean = true;
  projectForm = new FormGroup({
    Name: new FormControl('', {validators : [Validators.required]}),
    StartDate: new FormControl('', Validators.required),
    FinishDate: new FormControl('', Validators.required),
    thumbnail: new FormControl(''),
  });

  SaveConfirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Save project " + this.project?.Name,
      header: 'Confirmation',
      icon: 'none',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.onConfirm();
      },
      reject: () => {},
    });
  }
  onConfirm() {
    
    this.project.Name = this.projectForm.get('Name')?.value || '';
    this.project.StartDate = this.projectForm.get('StartDate')?.value || '';
    this.project.FinishDate = this.projectForm.get('FinishDate')?.value || '';
    this.project.thumbnail = this.projectForm.get('thumbnail')?.value || '';

    let result =
      this.project.id == 0
        ? this.projectsService.AddDiyProject(this.project)
        : this.projectsService.updateProjectById(this.project);
    result.subscribe((updatedProject: any) => {
      this.project = updatedProject;
      this.projectChange.emit(updatedProject);
    });
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  ngOnChanges() {
    console.log('display : ' + this.display);
    this.isEdit = this.project?.id == undefined ? false : true;
    if (this.isEdit) {
      this.projectForm.patchValue(this.project);
      this.projectForm
        .get('StartDate')
        ?.patchValue(this.formatDate(this.project.StartDate));
      this.projectForm
        .get('FinishDate')
        ?.patchValue(this.formatDate(this.project.FinishDate));
    }
  }

  private formatDate(dateInput: string) {
    return (
      dateInput.substring(0, 4) +
      '-' +
      dateInput.substring(5, 7) +
      '-' +
      dateInput.substring(8, 10)
    );
  }
}

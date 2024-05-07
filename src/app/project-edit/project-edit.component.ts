import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, NgModel} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Project } from '../../types';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [CommonModule, ButtonModule, ReactiveFormsModule, DialogModule, CalendarModule, FormsModule, InputTextModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss'
})

export class ProjectEditComponent {

  constructor(private projectsService: ProjectsService){}

  @Input() project! : Project;
  @Input() display : boolean = false;
  @Input() header! : string;
  @Output() displayChange = new EventEmitter<boolean>();

projectForm = new FormGroup({
                            Name : new FormControl('') ,
                            StartDate  : new FormControl(''),
                            FinishDate : new FormControl(''),
                            thumbnail : new FormControl('')
                            });

  onConfirm ()
  {
    console.log('edit triggered');
    this.project.Name = this.projectForm.get("Name")?.value || '';
    this.project.StartDate  = this.projectForm.get("StartDate")?.value || '';
    this.project.FinishDate = this.projectForm.get("FinishDate")?.value || '';
    this.project.thumbnail = this.projectForm.get("thumbnail")?.value || '';

    let result = this.projectsService.updateProjectById(this.project);
    result 
    .subscribe(
      (projects : any) => {
                                this.project = projects;
                          }     
                              
    );     
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() 
  {  
    this.display = false;
    this.displayChange.emit(this.display);
  }
  ngOnChanges() {
    this.projectForm.patchValue(this.project);
    this.projectForm.get('StartDate')?.patchValue(this.formatDate(this.project.StartDate));
    this.projectForm.get('FinishDate')?.patchValue(this.formatDate(this.project.FinishDate));
  }

  private formatDate(dateInput : string) {
   return dateInput.substring(0,4) + "-" + dateInput.substring(5,7) + "-" + dateInput.substring(8,10) ;  
  }

}

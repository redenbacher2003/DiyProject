import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectMaterial } from '../../types';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-material-edit',
  standalone: true,
  imports: [CommonModule, ButtonModule, ReactiveFormsModule, DialogModule, InputTextModule, FormsModule],
  templateUrl: './project-material-edit.component.html',
  styleUrl: './project-material-edit.component.scss'
})
export class ProjectMaterialEditComponent {
  constructor(private projectService : ProjectsService) {} 

  @Input() projectMaterial! :ProjectMaterial;
  @Input() displayMaterial : boolean = false;
  @Input() header! : string;
  @Output() displayMaterialChange = new EventEmitter<boolean>();

  projectMaterialGroup = new FormGroup ({
                                materialName : new FormControl('') ,
                                quantity  : new FormControl(0),
                                amount : new FormControl(0.00),
                                StoreName : new FormControl(''),
                                purchaseDate : new FormControl(''),
                              });



    onConfirm() 
    {
      console.log('edit triggered');
      this.projectMaterial.materialName = this.projectMaterialGroup.get("materialName")?.value || ''; 
      this.projectMaterial.quantity = this.projectMaterialGroup.get("quantity")?.value || 0;
      this.projectMaterial.amount = this.projectMaterialGroup.get("amount")?.value || 0.00;
      this.projectMaterial.StoreName = this.projectMaterialGroup.get("StoreName")?.value || '';
      this.projectMaterial.purchaseDate = this.projectMaterialGroup.get("purchaseDate")?.value || '';

     let result = this.projectService.updateProjectMaterialById(this.projectMaterial);
    result 
    .subscribe(
      (data: any) => {
                                this.projectMaterial = data;
                          }     
                              
    );     
    this.displayMaterial = false;
    this.displayMaterialChange.emit(this.displayMaterial);
    }                                                    
    onCancel() 
    {  
      this.displayMaterial = false;
      this.displayMaterialChange.emit(this.displayMaterial);
    }
    ngOnChanges() {
      if (this.projectMaterial) 
      {
        this.projectMaterialGroup.patchValue(this.projectMaterial);
        this.projectMaterialGroup.get('purchaseDate')?.patchValue(this.formatDate(this.projectMaterial.purchaseDate));
      }
    }

    private formatDate(dateInput : string) {
      return dateInput.substring(0,4) + "-" + dateInput.substring(5,7) + "-" + dateInput.substring(8,10) ;  
     }
                            
  }
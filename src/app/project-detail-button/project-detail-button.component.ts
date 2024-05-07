
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProjectMaterial } from '../../types';

@Component({
  selector: 'app-project-detail-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './project-detail-button.component.html',
  styleUrl: './project-detail-button.component.scss'
})
export class ProjectDetailButtonComponent implements ICellRendererAngularComp { 
  
  @Input() projectMaterial! : ProjectMaterial;
  @Output() public selectedMaterial : EventEmitter<ProjectMaterial> = new EventEmitter();
  public params : any;
  public SelectedRow : any; 
  agInit(params: ICellRendererParams): void {
    this.params = params;
    //console.log(this.params.context.componentParent); 
  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  buttonClicked() {
    this.SelectedRow = this.params.context.componentParent.getSelectedRows();
    console.log(this.SelectedRow);
 //   this.params.context.componentParent
  }

}
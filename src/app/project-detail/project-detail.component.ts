import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Project } from '../../types';
import { ProjectsService } from '../projects.service';
import { ProjectMaterials, ProjectMaterial } from '../../types';
import { Subject } from 'rxjs';
import { ProjectDetailButtonComponent } from '../project-detail-button/project-detail-button.component';
import { ProjectMaterialEditComponent } from '../project-material-edit/project-material-edit.component';
import { ButtonModule } from 'primeng/button';
import { ColDef, GridApi, GridReadyEvent, ModuleRegistry, RowClickedEvent } from "ag-grid-community";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
ModuleRegistry.registerModules([ClientSideRowModelModule]);

let gridApi: GridApi<ProjectMaterial>;

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [ProjectDetailButtonComponent, ProjectMaterialEditComponent, ButtonModule, AgGridModule, AgGridAngular],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})

export class ProjectDetailComponent {

  @Input() project! : Project;
  @Output() public SelectProjectMaterialFromParent: EventEmitter<ProjectMaterial> = new EventEmitter();
  private gridApi!: GridApi;
  public columnDefs : ColDef[] = [
                               { field: "Id", flex: .35},
                               { field: "materialName", flex: 2.5, filter: true},
                               { field: "quantity", flex: .75 },
                               { field: "amount", valueFormatter: p => '$' + (p.value).toFixed(2), flex: .50 },
                               { field: "StoreName", flex: 1, filter: true},
                               { field: "purchaseDate", valueFormatter: p => (p.value).slice(0, 10), flex: 1 },
                               { field: "added",valueFormatter: p => (p.value).slice(0, 10), flex: 1 },
                               { field: "addedBy", flex: 1 }
                             ]; 

  public defaultColDef: ColDef = {flex: 1 };
  public rowSelection = "single | multiple";
  public onSelectionChanged = "onselectionChange"; 
  //public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;
  public themeClass: string = "ag-theme-quartz";
 
  public detailHeader : string = ""; 
  projectId : number = 0;
  diyProjectmaterials! : ProjectMaterials;
  diyProjectMaterial : ProjectMaterial[] = [];
  rowData! : any ;
  pagination : boolean = true;
  paginationPageSize : number = 8;
  paginationPageSizeSelector =[8, 16, 24];
  projectMaterial! : ProjectMaterial;
  displayEditMaterial : boolean = false;
  editProjectHeader : string = "Edit Material"; 
  constructor(private projectService : ProjectsService) { }
  
  ngOnChanges() { 
   this.rowData = [];
   this.DiyProjectView() 
        .subscribe(
                     (data : ProjectMaterials) => 
                         {this.rowData = data}
                  )

  } 
  
  // colDefs : ColDef []= [
 
  //                         { field: "Id", flex: .35},
  //                         { field: "materialName", flex: 2.5, filter: true},
  //                         { field: "quantity", flex: .75 },
  //                         { field: "amount", valueFormatter: p => '$' + (p.value).toFixed(2), flex: .50 },
  //                         { field: "StoreName", flex: 1, filter: true},
  //                         { field: "purchaseDate", valueFormatter: p => (p.value).slice(0, 10), flex: 1 },
  //                         { field: "added",valueFormatter: p => (p.value).slice(0, 10), flex: 1 },
  //                         { field: "addedBy", flex: 1 }
  //                     ]; 


  DiyProjectView () 
  { 
      
    var subject = new Subject<ProjectMaterials>(); 
    this.detailHeader = this.project?.Name ?? '';
    this.projectService 
    .getProjectMaterialsByDiyProjectId(this.project?.id ?? 0)
    .subscribe(
                (materials : ProjectMaterials) => {
                                      this.diyProjectmaterials = materials ; 
                                      subject.next(this.diyProjectmaterials);
                                    }     
                                        
              ); 
              return subject.asObservable();
     
  }

  public onEditMaterial(fromChildProjectMaterial : any) : void {
    this.projectMaterial = fromChildProjectMaterial;
    this.SelectProjectMaterialFromParent.emit(this.projectMaterial);
    this.displayEditMaterial = true; 
    console.log('triggered');
  }

  
  onselectionChange(event : any)
  {
    this.projectMaterial = event.data;
  }
  
  editMaterial()
  {
      this.displayEditMaterial = true;
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setGridOption("onRowClicked", (event: RowClickedEvent) => this.onselectionChange(event))
  }
}
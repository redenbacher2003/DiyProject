import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../types';
import { ProjectsService } from '../projects.service';
import { ProjectMaterials, ProjectMaterial } from '../../types';
import { Subject } from 'rxjs';
import { ProjectDetailButtonComponent } from '../project-detail-button/project-detail-button.component';
import { ProjectMaterialEditComponent } from '../project-material-edit/project-material-edit.component';
import { ButtonModule } from 'primeng/button';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
  QuerySelector,
  RowClickedEvent,
  RedrawRowsParams,
  RowNode,
} from 'ag-grid-community';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { CurrencyPipe } from '@angular/common';
ModuleRegistry.registerModules([ClientSideRowModelModule]);

let gridApi: GridApi<ProjectMaterial>;

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    ProjectDetailButtonComponent,
    ProjectMaterialEditComponent,
    ButtonModule,
    AgGridModule,
    AgGridAngular,
    ToastModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    DialogModule,
    TooltipModule,
    CurrencyPipe
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent {
  constructor(
    private projectService: ProjectsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  @Input() project!: Project;
  @Output()
  public SelectProjectMaterialFromParent: EventEmitter<ProjectMaterial> =
    new EventEmitter();
  isEditDisabled: boolean = true;
  private gridApi!: GridApi;
  public columnDefs: ColDef[] = [
    { field: 'Id', flex: 0.35 },
    { field: 'materialName', flex: 2.5, filter: true },
    { field: 'quantity', flex: 0.75 },
    {
      field: 'amount',
      valueFormatter: (p) => '$' + p.value.toFixed(2),
      flex: 0.5,
    },
    { field: 'storeName', flex: 1, filter: true },
    {
      field: 'purchaseDate',
      valueFormatter: (p) => p.value.slice(0, 10),
      flex: 1,
    },
    { field: 'added', valueFormatter: (p) => p.value.slice(0, 10), flex: 1 },
    { field: 'addedBy', flex: 1 },
  ];

  public defaultColDef: ColDef = { flex: 1 };
  public rowSelection = 'single | multiple';
  public onSelectionChanged = 'onselectionChange';
  public themeClass: string = 'ag-theme-quartz';

  public detailHeader: string = '';
  projectId: number = 0;
  diyProjectmaterials: ProjectMaterial[] = [];
  diyProjectMaterial: ProjectMaterial[] = [];
  rowData!: any;
  pagination: boolean = true;
  paginationPageSize: number = 8;
  paginationPageSizeSelector = [8, 16, 24];
  projectMaterial!: ProjectMaterial;
  displayEditMaterial: boolean = false;
  displayAddMaterial: boolean = false;
  editProjectHeader: string = 'Edit Material';
  amount : number = 0;

  ngOnChanges() {   
    this.isEditDisabled = true;
    this.rowData = [];
    this.DiyProjectView().subscribe((data: ProjectMaterial[]) => {      
     this.rowData = data;
     console.log(data);
      this.amount = data.reduce((accumulator, currentValue) => accumulator + (currentValue.amount * currentValue.quantity), 0);
    });
  }

  computeTotal(sum : number, num : number)  : number {
    return sum + num;
  }
  DiyProjectView() {
    var subject = new Subject<ProjectMaterial[]>();
    this.detailHeader = this.project?.Name ?? '';
    this.projectService
      .getProjectMaterialsByDiyProjectId(this.project?.id ?? 0)
      .subscribe((materials: ProjectMaterial[]) => {
        this.diyProjectmaterials = materials;
        subject.next(this.diyProjectmaterials);
      });
    return subject.asObservable();
  }

  public onEditMaterial(fromChildProjectMaterial: any): void {
    this.projectMaterial = fromChildProjectMaterial;
    this.SelectProjectMaterialFromParent.emit(this.projectMaterial);
    this.displayEditMaterial = true;
  }

  onselectionChange(event: any) {
    this.isEditDisabled = false;
    this.projectMaterial = event.data;
  }

  editMaterial() {
    this.editProjectHeader = this.detailHeader;
    this.displayEditMaterial = true;
  }
  addMaterial() {
    this.projectMaterial = {
      Id: 0,
      Name: '',
      diyProjectId: this.project.id,
      materialName: '',
      quantity: 0,
      amount: 0.0,
      storeName: '',
      purchaseDate: '',
      added: new Date().toJSON(),
      addedBy: 'Reden',
    };

    this.editProjectHeader = this.detailHeader;
    this.displayEditMaterial = true;
    this.isEditDisabled = true;
  }

  deleteMaterial(event: Event) {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are sure you wish to delete : ' + this.projectMaterial.materialName.trim() + '?',
      header: 'Confirmation',
      icon: 'none',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.projectService.DeleteProjectMaterial(
          this.projectMaterial.Id,
          'Reden'
        );
        
        setTimeout(() => {
          this.ngOnChanges();
          this.messageService.add({
            severity: 'info',
            summary: 'info',
            detail: 'Project Material Deleted!',
          });
        }, 10);

      },
      reject: () => {},
    });
  }

  materialCallBack(event: any) {
    this.displayEditMaterial = false;
    if (event == 'confirm') {
      console.log('will refresh');

      setTimeout(() => {
        this.ngOnChanges();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Project Material Saved!',
        });
      }, 10);
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setGridOption('onRowClicked', (event: RowClickedEvent) =>
      this.onselectionChange(event)
    );
  }
}
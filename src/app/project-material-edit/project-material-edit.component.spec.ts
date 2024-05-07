import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMaterialEditComponent } from './project-material-edit.component';

describe('ProjectMaterialEditComponent', () => {
  let component: ProjectMaterialEditComponent;
  let fixture: ComponentFixture<ProjectMaterialEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMaterialEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectMaterialEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

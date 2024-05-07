import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailButtonComponent } from './project-detail-button.component';

describe('ProjectDetailButtonComponent', () => {
  let component: ProjectDetailButtonComponent;
  let fixture: ComponentFixture<ProjectDetailButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectDetailButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

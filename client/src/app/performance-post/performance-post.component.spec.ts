import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformancePostComponent } from './performance-post.component';

describe('PerformancePostComponent', () => {
  let component: PerformancePostComponent;
  let fixture: ComponentFixture<PerformancePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformancePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformancePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

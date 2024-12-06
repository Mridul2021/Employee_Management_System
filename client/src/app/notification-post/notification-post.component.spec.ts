import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationPostComponent } from './notification-post.component';

describe('NotificationPostComponent', () => {
  let component: NotificationPostComponent;
  let fixture: ComponentFixture<NotificationPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationPostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

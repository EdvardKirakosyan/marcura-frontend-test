import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePickerComponent } from './route-picker.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RoutePickerComponent', () => {
  let component: RoutePickerComponent;
  let fixture: ComponentFixture<RoutePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutePickerComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

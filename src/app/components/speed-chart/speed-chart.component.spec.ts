import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeedChartComponent } from './speed-chart.component';
import { ChangeDetectorRef } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { IRoutePoint } from '../../interfaces/IRoutePoint.interface';

describe('SpeedChartComponent', () => {
  let component: SpeedChartComponent;
  let fixture: ComponentFixture<SpeedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeedChartComponent],
      providers: [
        ChangeDetectorRef,
        {
          provide: BaseChartDirective,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the chart data when updateChart is called', () => {
    component.routePoints = [
      {
        x: new Date().getTime(),
        y: 100,
      } as unknown as IRoutePoint,
    ];
    component.updateChart();
    expect(component.lineChartData.datasets[0].data.length).toBeGreaterThan(0);
  });
});

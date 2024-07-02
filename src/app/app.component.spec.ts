import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { BaseChartDirective } from 'ng2-charts';
import { MapComponent } from './components/map/map.component';
import { RoutePickerComponent } from './components/route-picker/route-picker.component';
import { SpeedChartComponent } from './components/speed-chart/speed-chart.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        LeafletModule,
        BaseChartDirective,
        MapComponent,
        RoutePickerComponent,
        SpeedChartComponent,
        AppComponent,
      ],
      providers: [ChangeDetectorRef],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should update selectedRoute and routePoints on route change', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const mockRoute = {
      from_port: 'Port A',
      leg_duration: '5',
      points: [
        { longitude: 20, latitude: 10, timestamp: 123456, speed: 5 },
        { longitude: 25, latitude: 15, timestamp: 123457, speed: 10 },
      ],
      route_id: 'route1',
      to_port: 'Port B',
    };

    app.onRouteChange(mockRoute);

    expect(app.selectedRoute).toEqual(mockRoute);
    expect(app.routePoints).toEqual(mockRoute.points);
  });

  it('should set routePoints to undefined if no route is provided', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.onRouteChange(undefined);

    expect(app.selectedRoute).toBeUndefined();
    expect(app.routePoints).toBeUndefined();
  });
});

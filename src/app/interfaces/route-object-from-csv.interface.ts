import { RoutePoint } from './route-point.interface';

export default interface RouteObjectFromCsv {
  from_port: string;
  leg_duration: string;
  points: RoutePoint[];
  route_id: string;
  to_port: string;
}

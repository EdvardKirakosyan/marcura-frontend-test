import { IRoutePoint } from './IRoutePoint.interface';

export default interface IShipRoute {
  from_port: string;
  leg_duration: string;
  points: IRoutePoint[];
  route_id: string;
  to_port: string;
}

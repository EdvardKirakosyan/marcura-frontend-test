import { latLng, tileLayer } from 'leaflet';

export const MAP_OPTIONS = {
  layers: [
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }),
  ],
  zoom: 2,
  center: latLng(50.879966, 0),
};

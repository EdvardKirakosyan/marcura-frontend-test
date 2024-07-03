# Marcura Frontend Test

Marcura Frontend Developer Test

The goal of this challenge is to create an Angular single page application to visualize exported sea routes on a map.

## Project Description

This project visualizes sea routes on a global map using Angular. It processes a CSV file with the following columns:

- **route_id**: Some arbitrary route id.
- **from_port**: Route origin.
- **to_port**: Route destination.
- **leg_duration**: Trip duration in milliseconds.
- **points**: An array of vessel observations from GPS where observation is [longitude, latitude, timestamp in epoch milliseconds, actual vessel speed in knots].

### Requirements for the challenge:

1. Initially, no routes are shown on the map. The page should load with a global map.
2. A route picker/filter component allows the selection of a single route to be shown on the map.
3. The map should display the selected route.
4. A graph/chart component shows how the speed changes over time for the selected route.
5. (Bonus) Color the line on the map according to vessel speed: close to the port (slow, e.g., red) and open sea (fast, e.g., green).

## Implementation Method

### Chosen Method: Leaflet, Chart.js

#### Leaflet
Leaflet was chosen for map visualization due to its lightweight nature and ease of integration.

**Pros:**
- Lightweight and fast.
- Easy to integrate with Angular.
- Extensive plugin ecosystem.

**Cons:**
- Less out-of-the-box functionality compared to some other mapping libraries.
- Requires additional plugins for advanced features.

#### Chart.js
Chart.js was used for visualizing speed changes over time.

**Pros:**
- Simple and easy to use.
- Responsive and customizable charts.
- Good documentation and community support.

**Cons:**
- Limited in terms of advanced chart types.
- Performance can be an issue with large datasets.

### Alternatives Considered

1. **Mapbox GL JS**
   - **Pros:**
     - High performance with large datasets.
     - Advanced features and styling options.
   - **Cons:**
     - More complex and heavier than Leaflet.
     - Licensing costs for commercial use.

2. **D3.js for Charts**
   - **Pros:**
     - Highly customizable and flexible.
     - Can handle complex data visualizations.
   - **Cons:**
     - Steeper learning curve.
     - More boilerplate code compared to Chart.js.

## Assumptions

- The CSV file format will remain consistent as described.
- Users have a basic understanding of navigating a web application.
- The application will be primarily used on modern browsers with ES6 support.
- Users will manually select a route to visualize it on the map.
- The color gradient for vessel speed will be sufficient to represent speed variations.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/EdwardKirakosyan/marcura-frontend-test.git
    ```
2. Navigate to the project directory:
    ```bash
    cd marcura-frontend-test
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [Jest](https://jestjs.io/).

## Linting

Run `npm run lint` to lint the code using ESLint.
Run `npm run lint:fix` to automatically fix linting errors.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Acknowledgments

- [Angular](https://angular.io/)
- [Node.js](https://nodejs.org/)
- [Jest](https://jestjs.io/)
- [Leaflet](https://leafletjs.com/)
- [Chart.js](https://www.chartjs.org/)
- [PapaParse](https://www.papaparse.com/)
- [Edward Kirakosyan](https://github.com/EdwardKirakosyan) - Author

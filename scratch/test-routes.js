import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '../src/App.jsx';
import { exteriorAccessories } from '../src/data/exteriorAccessories.js';
import { interiorAccessories } from '../src/data/interiorAccessories.js';

// Test list of routes
const routes = [
  '/',
  '/about',
  '/exterior-car-accessories-chennai',
  '/interior-car-accessories-chennai',
  '/gallery',
  '/contact',
  '/franchise',
  '/404',
];

exteriorAccessories.forEach(s => {
  routes.push(`/exterior-car-accessories-chennai/${s.slug}`);
});

interiorAccessories.forEach(s => {
  routes.push(`/interior-car-accessories-chennai/${s.slug}`);
});

console.log(`Testing ${routes.length} routes with MemoryRouter...`);

let failed = 0;
for (const route of routes) {
  try {
    const helmetContext = {};
    const html = ReactDOMServer.renderToString(
      React.createElement(
        HelmetProvider,
        { context: helmetContext },
        React.createElement(
          MemoryRouter,
          { initialEntries: [route] },
          React.createElement(App)
        )
      )
    );
    if (!html || html.length < 50) {
      console.error(`Route ${route} produced suspiciously short HTML (${html.length} chars)`);
      failed++;
    }
  } catch (err) {
    console.error(`Error rendering route ${route}:`, err);
    failed++;
  }
}

if (failed === 0) {
  console.log(`ALL ${routes.length} ROUTES RENDERED SUCCESSFULLY WITH MEMORYROUTER!`);
} else {
  console.log(`${failed} routes failed!`);
}

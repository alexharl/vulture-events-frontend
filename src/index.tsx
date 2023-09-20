import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { PrimeReactProvider } from 'primereact/api';

//theme
import './index.css';
import 'primereact/resources/themes/vela-orange/theme.css';

//core
import '/node_modules/primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomeRoute from './destinations/home';
import SearchRoute from './destinations/search';
import DetailRoute from './destinations/detail';

const router = createBrowserRouter([HomeRoute, DetailRoute, SearchRoute]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

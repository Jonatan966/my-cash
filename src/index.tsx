import React from 'react';
import ReactDOM from 'react-dom';

import * as ServiceWorkerRegistration from './serviceWorkerRegistration';
import { App } from './App';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ServiceWorkerRegistration.unregister()

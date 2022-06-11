import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './app'

import * as ServiceWorkerRegistration from './service-worker-registration'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

ServiceWorkerRegistration.unregister()

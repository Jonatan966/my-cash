import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'

import * as ServiceWorkerRegistration from './serviceWorkerRegistration'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

ServiceWorkerRegistration.register()

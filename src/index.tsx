import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './styles/reset.css'

import { Provider } from 'react-redux'
import store from './store'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.register()

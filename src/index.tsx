import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import 'utils/yupLocale'
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

if (process.env.NODE_ENV === 'development') {
  require('mimic')
}

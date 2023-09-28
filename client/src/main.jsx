import React from 'react'
import ReactDOM from 'react-dom/client' // Importa el método ReactDOM.createRoot, que es utilizado para renderizar la aplicación de React en el DOM.
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'//BrowserRouter es un componente que permite manejar la navegación y las rutas en una aplicación de React.
import { Provider } from 'react-redux' 
import store from './redux/store'  
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* es un componente de React que se utiliza para activar ciertas advertencias y comprobaciones adicionales en modo de desarrollo. */} 
     <Provider store={store}> {/* Provider envuelve la aplicación React y le proporciona acceso al store de Redux. */} 
      <BrowserRouter> {/* proporciona a la aplicación la capacidad de manejar la navegación mediante el enrutamiento  */}
        <App/> {/* Randeriza el componente App */}
       </BrowserRouter>
    </Provider> 
  </React.StrictMode>
)

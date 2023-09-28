//Componente principal de la aplicación
import './App.css'
import { Route, Routes, useLocation} from 'react-router-dom' //componentes y hooks necesarios para el enrutamiento 
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Form from './components/Form/Form'
import Detail from './components/Detail/Detail'
import Nav from './components/Nav/Nav' 


function App() {
  const location = useLocation()  //obtiene la ubicación actual

  return (
    <>
      <div>
        <div> 
        { location.pathname !== '/' && location.pathname !== '/home' ? <Nav/>: null } {/* Si la ruta actual no es '/' ni '/home', se muestra el componente Nav. */}
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/detail/:id' element={<Detail/>}/>
          <Route path='/form' element={<Form/>}/>
        </Routes>

        </div>

      </div>
    </>
  )
}

export default App

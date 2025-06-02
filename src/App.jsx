import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import FormProduccion from './FormProduccion'
import SignIn from './SignIn';
import FormExpendio from  './FormExpendio';
import AdminPage from './AdminPage';
import ControlEnvasado from './ControlEnvasado';
import Recepcion from './Recepcion';
import FormPesado from './FormPesado';



function App() {

  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/produccion' element={<FormProduccion />} />
      <Route path='/SignIn' element={<SignIn/>} />
      <Route path='/expendio' element={<FormExpendio />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/productos-envasados' element={<ControlEnvasado />} />
      <Route path='/recepcion' element={<Recepcion />} />
      <Route path='/producto-pesados' element={<FormPesado />} />
    </Routes>
  )
}

export default App

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import PrivateRoute from './Components/PrivateRoute'
import { AuthProvider } from './Context/AuthContext'

import Room from "./Pages/Room"
import Login from "./Pages/Login"
import Register from './Pages/Register'


function App() {
 

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/Login' element= {<Login/>}/>
          <Route path='/register' element= {<Register/>}/>
          <Route element = {<PrivateRoute />}>
            <Route path='/' element= {<Room />}/>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App

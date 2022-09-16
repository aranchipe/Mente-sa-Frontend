import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import LoginpPasswordLost from './pages/Login/LoginPasswordLost'
import Main from './pages/Main'
import Pacientes from './pages/Pacientes'
import Sessoes from './pages/Sessoes'



function MainRoutes() {
    return (
        <>
            <ToastContainer />
            
             <Routes>   
                <Route path='/login/*' element={<Login/>}/>
                <Route path='/LoginPasswordLost' element={<LoginpPasswordLost/>}/>
                <Route path='/cadastro' element={<Cadastro />} />

                <Route path="/">                  
                    <Route path="/" element={<Main />} />
                    <Route path="/main" element={<Main />} />
                </Route>

                <Route path='/pacientes' element={<Pacientes />}></Route>
                <Route path='/sessoes' element={<Sessoes />}></Route>
            </Routes>
        </>
    )
}

export default MainRoutes
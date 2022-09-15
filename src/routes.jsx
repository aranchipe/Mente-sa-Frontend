import Cadastro from './pages/Cadastro'
import Main from './pages/Main'
import Pacientes from './pages/Pacientes'
import Sessoes from './pages/Sessoes'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Dashboard from './pages/Dashboard'
function MainRoutes() {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path="/">
                    <Route path="/" element={<Main />} />
                    <Route path="/main" element={<Main />} />
                </Route>
                <Route path='/dashboard' element={<Dashboard />} />

                <Route path='/pacientes' element={<Pacientes />}></Route>
                <Route path='/sessoes' element={<Sessoes />}></Route>
            </Routes>
        </>
    )
}

export default MainRoutes
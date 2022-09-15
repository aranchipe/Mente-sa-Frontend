import Cadastro from './pages/Cadastro'
import Main from './pages/Main'
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

            </Routes>
        </>
    )
}

export default MainRoutes
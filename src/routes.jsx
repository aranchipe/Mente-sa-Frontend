import Cadastro from './pages/Cadastro'
import Main from './pages/Main'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
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
            </Routes>
        </>
    )
}

export default MainRoutes
import { useState } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Main from './pages/Main'
import Pacientes from './pages/Pacientes'
import Sessoes from './pages/Sessoes'
import { getItem } from './utils/storage'


function ProtectedRoutes({ redirectTo }) {
    const authentication = getItem('token');

    return authentication ? <Outlet /> : < Navigate to={redirectTo} />
}

function MainRoutes() {
    const [page, setPage] = useState('sessoes')

    return (
        <>
            <ToastContainer />

            <Routes>
                <Route path='/cadastro' element={<Cadastro />} />

                <Route path="/">
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<ProtectedRoutes redirectTo='/login' />}>
                    <Route path='/main' element={<Main page={page} setPage={setPage} />} />
                    <Route path='/sessoes' element={<Sessoes page={page} setPage={setPage} />} />
                    <Route path='/pacientes' element={<Pacientes page={page} setPage={setPage} />} />
                </Route>
            </Routes>
        </>
    )
}

export default MainRoutes
import { useState } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Main from './pages/Main'
import Pacientes from './pages/Pacientes'
import Sessoes from './pages/Sessoes'
import { getItem } from './utils/storage'
import axios from './services/axios'
import { useEffect } from 'react'



function ProtectedRoutes({ redirectTo }) {
    const authentication = getItem('token');

    return authentication ? <Outlet /> : < Navigate to={redirectTo} />
}

function MainRoutes() {
    const [page, setPage] = useState('sessoes')
    const token = getItem('token');
    const [pacientes, setPacientes] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [paginaPacientes, setPaginaPacientes] = useState(1);
    const [pacientesTotais, setPacientesTotais] = useState([]);
    const [size, setSize] = useState(6);
    const [sizeSessoes, setSizeSessoes] = useState(6);
    const [sessoes, setSessoes] = useState([]);
    const [sessoesTotais, setSessoesTotais] = useState([]);
    const [sessoesDoDia, setSessoesDoDia] = useState()
    const [sessoesDoMes, setSessoesDoMes] = useState()
    const [sessoesCanceladasMes, setSessoesCanceladasMes] = useState()
    const [sessoesIndividuais, setSessoesIndividuais] = useState()
    const [sessoesDupla, setSessoesDupla] = useState()
    const [sessoesGrupo, setSessoesGrupo] = useState()
    const [isSessoesLoading, setIsSessoesLoading] = useState(false)
    const [isPacientesLoading, setIsPacientesLoading] = useState(false)


    async function listarPacientes() {
        setIsPacientesLoading(true)
        try {
            const pacientesTotais = await axios.get('/paciente', {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            })

            const response = await axios.get(`/paciente?page=${paginaPacientes}&size=${size}`, {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            })

            setPacientes(response.data)
            setPacientesTotais(pacientesTotais.data)

        } catch (error) {

        } finally {
            setIsPacientesLoading(false)
        }
    }

    async function listarSessoes() {
        setIsSessoesLoading(true)
        try {
            const response = await axios.get(`/sessao?page=${pagina}&size=${sizeSessoes}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const sessoesTotais = await axios.get("/sessao", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const sessoesDoDia = sessoesTotais.data.filter((item) => {
                return new Date().getDate() === new Date(item.data).getDate() &&
                    new Date().getMonth() === new Date(item.data).getMonth() &&
                    new Date().getYear() === new Date(item.data).getYear()
            })

            const sessoesDoMes = response.data.filter((item) => {
                return new Date().getMonth() === new Date(item.data).getMonth() &&
                    new Date().getYear() === new Date(item.data).getYear()
            })

            const sessoesCanceladasMes = response.data.filter((item) => {
                return new Date().getMonth() === new Date(item.data).getMonth() &&
                    new Date().getYear() === new Date(item.data).getYear() &&
                    item.status === "Cancelado"
            })

            const sessoesIndividuais = response.data.filter((item) => {
                return item.tipo === "Individual"
            })

            const sessoesDupla = response.data.filter((item) => {
                return item.tipo === "Dupla"
            })

            const sessoesGrupo = response.data.filter((item) => {
                return item.tipo === "Grupo"
            })

            setSessoesGrupo(sessoesGrupo.length)
            setSessoesDoDia(sessoesDoDia.length)
            setSessoesDupla(sessoesDupla.length)
            setSessoesIndividuais(sessoesIndividuais.length)
            setSessoesDoMes(sessoesDoMes.length)
            setSessoesCanceladasMes(sessoesCanceladasMes.length)
            setSessoesTotais(sessoesTotais.data);
            setSessoes(response.data);
        } catch (error) { }
        finally {
            setIsSessoesLoading(false)
        }
    }



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
                    <Route path='/main' element={
                        <Main
                            page={page}
                            setPage={setPage}
                            pacientes={pacientesTotais.length}
                            sessoesDoDia={sessoesDoDia}
                            sessoesDoMes={sessoesDoMes}
                            sessoesCanceladasMes={sessoesCanceladasMes}
                            sessoesIndividuais={sessoesIndividuais}
                            listarSessoes={listarSessoes}
                            sessoesDupla={sessoesDupla}
                            sessoesGrupo={sessoesGrupo}
                            isSessoesLoading={isSessoesLoading}
                        />}
                    />
                    <Route path='/sessoes' element={
                        <Sessoes
                            pacientesTotais={pacientesTotais}
                            page={page}
                            setPage={setPage}
                            listarPacientes={listarPacientes}
                            listarSessoes={listarSessoes}
                            sessoesTotais={sessoesTotais}
                            sessoes={sessoes}
                            setSessoes={setSessoes}
                            sizeSessoes={sizeSessoes}
                            setSizeSessoes={setSizeSessoes}
                            pagina={pagina}
                            setPagina={setPagina}
                            isSessoesLoading={isSessoesLoading}
                            setIsPacientesLoading={setIsPacientesLoading}

                        />
                    } />
                    <Route path='/pacientes' element={
                        <Pacientes
                            listarPacientes={listarPacientes}
                            pacientesTotais={pacientesTotais}
                            pacientes={pacientes}
                            page={page}
                            setPage={setPage}
                            paginaPacientes={paginaPacientes}
                            setPaginaPacientes={setPaginaPacientes}
                            size={size}
                            setSize={setSize}
                            isPacientesLoading={isPacientesLoading}
                            setIsPacientesLoading={setIsPacientesLoading}
                        />
                    }
                    />
                </Route>
            </Routes>
        </>
    )
}

export default MainRoutes
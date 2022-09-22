import './style.css';
import MenuLateral from '../../components/MenuLateral';
import DashboardCard from '../../components/DashboardCard';
import axios from '../../services/axios';
import { getItem } from '../../utils/storage'
import { useState } from 'react';
import { useEffect } from 'react';
import { notifyError } from '../../utils/toast'

function Main({ page, setPage }) {
    const token = getItem('token')
    const [pacientes, setPacientes] = useState()
    const [sessoesDoDia, setSessoesDoDia] = useState()

    useEffect(() => {
        listarPacientes()
        setPage('dashboard')
        listarSessoesDoDia()
    })

    async function listarPacientes() {
        try {
            const response = await axios.get('/paciente', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setPacientes(response.data.length)
        } catch (error) {
            return notifyError(error.response.data.mensagem);
        }
    }

    async function listarSessoesDoDia() {
        try {
            const response = await axios.get('/sessao', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const sessoesDoDia = response.data.filter((item) => {
                return new Date().getDate() === new Date(item.data).getDate() &&
                    new Date().getMonth() === new Date(item.data).getMonth() &&
                    new Date().getYear() === new Date(item.data).getYear()
            })

            setSessoesDoDia(sessoesDoDia.length)


        } catch (error) {

        }
    }


    return (
        <div className="Main">
            <MenuLateral page={page} setPage={setPage} />
            <div className='main-content'>
                <DashboardCard
                    titulo='Sessões agendadas (dia)'
                    valor={sessoesDoDia}
                />
                <DashboardCard
                    titulo='Sessões agendadas (mês)'
                    valor='5'
                />
                <DashboardCard
                    titulo='Sessões canceladas (mês)'
                    valor='5'
                />
                <DashboardCard
                    titulo='Total de pacientes cadastrados'
                    valor={pacientes}
                />
                <DashboardCard
                    titulo='Total de sessões
                    (individuais)'
                    valor='5'
                />
                <DashboardCard
                    titulo='Total de sessões
                    (dupla)'
                    valor='5'
                />
                <DashboardCard
                    titulo='Total de sessões (grupo)'
                    valor='5'
                />
            </div>
        </div>
    );
}

export default Main;

import './style.css';
import MenuLateral from '../../components/MenuLateral';
import DashboardCard from '../../components/DashboardCard';
import axios from '../../services/axios';
import { getItem } from '../../utils/storage'
import { useState } from 'react';
import { useEffect } from 'react';
import { notifyError } from '../../utils/toast'

function Main() {
    const token = getItem('token')
    const [pacientes, setPacientes] = useState()
    useEffect(() => {
        listarPacientes()
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


    return (
        <div className="Main">
            <MenuLateral />
            <div className='main-content'>
                <DashboardCard
                    titulo='Sessões agendadas (dia)'
                    valor='5'
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

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
    const [sessoesDoMes, setSessoesDoMes] = useState()
    const [sessoesCanceladasMes, setSessoesCanceladasMes] = useState()
    const [sessoesIndividuais, setSessoesIndividuais] = useState()
    const [sessoesDupla, setSessoesDupla] = useState()
    const [sessoesGrupo, setSessoesGrupo] = useState()

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


            setSessoesDoMes(sessoesDoMes.length)
            setSessoesDoDia(sessoesDoDia.length)
            setSessoesCanceladasMes(sessoesCanceladasMes.length)
            setSessoesIndividuais(sessoesIndividuais.length)
            setSessoesDupla(sessoesDupla.length)
            setSessoesGrupo(sessoesGrupo.length)

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
                    valor={sessoesDoMes}
                />
                <DashboardCard
                    titulo='Sessões canceladas (mês)'
                    valor={sessoesCanceladasMes}
                />
                <DashboardCard
                    titulo='Total de pacientes cadastrados'
                    valor={pacientes}
                />
                <DashboardCard
                    titulo='Total de sessões
                    (individuais)'
                    valor={sessoesIndividuais}
                />
                <DashboardCard
                    titulo='Total de sessões
                    (dupla)'
                    valor={sessoesDupla}
                />
                <DashboardCard
                    titulo='Total de sessões (grupo)'
                    valor={sessoesGrupo}
                />
            </div>
        </div>
    );
}

export default Main;

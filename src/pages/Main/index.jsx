import './style.css';
import MenuLateral from '../../components/MenuLateral';
import DashboardCard from '../../components/DashboardCard';
import { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress';

function Main({
    page,
    setPage,
    pacientes,
    sessoesDoDia,
    listarSessoes,
    sessoesDoMes,
    sessoesCanceladasMes,
    sessoesIndividuais,
    sessoesDupla,
    sessoesGrupo,
    isSessoesLoading
}) {

    useEffect(() => {
        setPage('dashboard')
        listarSessoes()
    }, [])

    return (
        <div className="Main">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isSessoesLoading}
            >
                <CircularProgress sx={{ color: 'var(--purple)' }} />
            </Backdrop>
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

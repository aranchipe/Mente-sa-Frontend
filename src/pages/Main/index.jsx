import './style.css';
import MenuLateral from '../../components/MenuLateral';
import DashboardCard from '../../components/DashboardCard';
import { useEffect } from 'react';

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
    sessoesGrupo
}) {

    useEffect(() => {
        setPage('dashboard')
        listarSessoes()
    })

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

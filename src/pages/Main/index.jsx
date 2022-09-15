import './style.css';
import MenuLateral from '../../components/MenuLateral';
import DashboardCard from '../../components/DashboardCard';

function Main() {
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
                    valor='65152'
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

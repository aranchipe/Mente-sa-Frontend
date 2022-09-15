import './style.css'
import Sidebar from '../../components/Sidebar'
import DashboardCard from '../../components/DashboardCard'

function Dashboard() {
    return (
        <div className='dashboard-container'>
            <Sidebar />
            <DashboardCard />
        </div>
    )
}

export default Dashboard
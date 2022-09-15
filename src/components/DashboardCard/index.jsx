import './style.css'

function DashboardCard({ titulo, valor }) {
    return (
        <div className='dashboard-card-container'>
            <h3>{titulo}</h3>
            <div className="valor">
                <h1>{valor}</h1>

            </div>
        </div>
    )
}

export default DashboardCard
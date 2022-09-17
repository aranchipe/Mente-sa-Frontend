import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { getItem, clear } from '../../utils/storage'
import exit from '../../assets/exit.svg'


export default function MenuLateral() {
    const nome = getItem('nome')
    const navigate = useNavigate()
    function logout() {
        clear()
        navigate('/login')
    }
    return (
        <div className="menu-lateral-container">

            <h1>Mente Sã</h1>

            <p>Bem-vindo(a),</p>
            <div className='logout'>
                <span style={{ fontWeight: '700' }}>Dr(a) {nome}</span>
                <img src={exit} alt='exit' style={{ width: '30px' }} onClick={logout} />
            </div>

            <nav>
                <Link to='/' className='link'>Dashboard</Link>
                <Link to='/pacientes' className='link'>Pacientes</Link>
                <Link to='/sessoes' className='link'>Sessões</Link>
            </nav>

        </div>
    )
}
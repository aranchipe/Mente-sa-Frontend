import './style.css'
import { Link } from 'react-router-dom'

export default function MenuLateral(){
    return(
        <div className="container">

        <h1>Mente Sã</h1>

        <p>Bem-vindo(a),</p>

        <nav>
            <Link to='/' className='link'>Dashboard</Link>
            <Link to='/pacientes' className='link'>Pacientes</Link>
            <Link to='/sessoes' className='link'>Sessões</Link>
        </nav>

        </div>
    )
}
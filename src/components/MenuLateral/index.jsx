import './style.js'
import { Link, useNavigate } from 'react-router-dom'
import { getItem, clear } from '../../utils/storage'
import exit from '../../assets/exit.svg'
import dashboard from '../../assets/dashboard.svg'
import dashboardRoxo from '../../assets/dashboard-roxo.svg'
import sessoes from '../../assets/sessoes.svg'
import sessoesRoxo from '../../assets/sessoes-roxo.svg'
import pacientes from '../../assets/pacientes.svg'
import pacientesRoxo from '../../assets/pacientes-roxo.svg'
import { useState } from 'react'
import { MenuLateralStyle } from './style.js'


export default function MenuLateral({ page, setPage }) {
    const nome = getItem('nome')
    const navigate = useNavigate()
    const [linkDashboard, setLinkDashboard] = useState(false)
    const [linkPacientes, setLinkPacientes] = useState(false)
    const [linkSessoes, setLinkSessoes] = useState(false)

    function logout() {
        clear()
        navigate('/login')
    }
    return (
        <MenuLateralStyle>
            <div className="menu-lateral-container">

                <h1>Mente Sã</h1>
                <p>Olá</p>
                <p>Bem-vindo(a),</p>
                <div className='logout'>
                    <span className='doutor' style={{ fontWeight: '700' }}>Dr(a) {nome}</span>
                    <img src={exit} alt='exit' style={{ width: '30px' }} onClick={logout} />
                </div>

                <nav>
                    <div
                        onMouseLeave={() => setLinkDashboard(false)}
                        onMouseOver={() => setLinkDashboard(true)}
                        className={page === 'dashboard' ? "link-div selecionado" : 'link-div'}
                        onClick={() => navigate('/main')}
                    >
                        <img style={{ width: '24px' }} src={linkDashboard || page === 'dashboard' ? dashboardRoxo : dashboard} alt='dashboard' />
                        <span
                            style={linkDashboard || page === 'dashboard' ? { color: 'blueviolet' } : {}}
                            className='link'
                        >
                            Dashboard
                        </span>
                    </div>
                    <div
                        onMouseLeave={() => setLinkPacientes(false)}
                        onMouseOver={() => setLinkPacientes(true)}
                        className={page === 'pacientes' ? "link-div selecionado" : 'link-div'}
                        onClick={() => navigate('/pacientes')}


                    >
                        <img style={{ width: '24px' }} src={linkPacientes || page === 'pacientes' ? pacientesRoxo : pacientes} alt='pacientes' />
                        <span
                            style={linkPacientes || page === 'pacientes' ? { color: 'blueviolet' } : {}}
                            className='link'
                        >
                            Pacientes
                        </span>
                    </div>

                    <div
                        onMouseLeave={() => setLinkSessoes(false)}
                        onMouseOver={() => setLinkSessoes(true)}
                        className={page === 'sessoes' ? "link-div selecionado" : 'link-div'}
                        onClick={() => navigate('/sessoes')}
                    >
                        <img style={{ width: '24px' }} src={linkSessoes || page === 'sessoes' ? sessoesRoxo : sessoes} alt='sessoes' />
                        <span
                            style={linkSessoes || page === 'sessoes' ? { color: 'blueviolet' } : {}}
                            className='link'>Sessões
                        </span>
                    </div>
                </nav >

            </div >
        </MenuLateralStyle>
    )
}
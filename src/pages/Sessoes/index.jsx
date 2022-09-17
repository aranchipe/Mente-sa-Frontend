import './style.css';
import MenuLateral from '../../components/MenuLateral';
import TabelaSessoes from '../../components/TabelaSessoes';
import axios from '../../services/axios';
import { getItem } from '../../utils/storage'
import { useState } from 'react';
import { useEffect } from 'react';
import lupa from '../../assets/lupa.svg'
import plus from '../../assets/plus.svg'

function Sessoes() {
    const token = getItem('token')
    const [sessoes, setSessoes] = useState([])

    useEffect(() => {
        listarSessoes()
    })
    async function listarSessoes() {
        try {
            const response = await axios.get('/sessao', {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            })
            setSessoes(response.data)

        } catch (error) {

        }
    }

    return (
        <div className="sessoes">
            <MenuLateral />
            <div className="sessoes-content">
                <div className="sessoes-cabecalho">
                    <h1>Minhas Sessões</h1>
                    <img src={lupa} alt='lupa' className='lupa' />
                    <input placeholder='Pesquisar' type="text" />
                    <button>
                        <img src={plus} alt='plus' className='plus' />
                        Nova Sessão
                    </button>

                </div>
                <TabelaSessoes sessoes={sessoes} />
            </div>
        </div>
    );
}

export default Sessoes;

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
    const [sessoesTotais, setSessoesTotais] = useState([])
    const [sessoesFiltradas, setSessoesFiltradas] = useState([])
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(6)
    const [filtro, setFiltro] = useState('')

    useEffect(() => {
        listarSessoes()

    })



    async function listarSessoes() {
        try {
            const response = await axios.get(`/sessao?page=${page}&size=${size}`, {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            })
            const sessoesTotais = await axios.get('/sessao', {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            })

            setSessoesTotais(sessoesTotais.data)
            setSessoes(response.data)

        } catch (error) {

        }
    }


    function handleFilter(e) {


        setFiltro(e.target.value)

        const filtrado = sessoesTotais.filter((item) => {
            return item.paciente.toUpperCase().includes(e.target.value.toUpperCase().trim());
        })

        if (filtrado.length) {
            setSessoesFiltradas(filtrado);
        }
    }

    return (
        <div className="sessoes">
            <MenuLateral />
            <div className="sessoes-content">
                <div className="sessoes-cabecalho">
                    <h1>Minhas Sessões</h1>
                    <img src={lupa} alt='lupa' className='lupa' />
                    <input
                        placeholder='Pesquisar'
                        type="text"
                        onChange={(e) => handleFilter(e)}
                    />
                    <button>
                        <img src={plus} alt='plus' className='plus' />
                        Nova Sessão
                    </button>

                </div>
                <TabelaSessoes
                    sessoes={filtro.length !== 0 ? sessoesFiltradas : sessoes}
                    page={page}
                    setPage={setPage}
                    size={size}
                    setSize={setSize}
                    sessoesTotais={sessoesTotais}
                />
            </div>
        </div>
    );
}

export default Sessoes;

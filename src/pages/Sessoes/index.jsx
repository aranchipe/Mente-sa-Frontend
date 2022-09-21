import './style.css';
import MenuLateral from '../../components/MenuLateral';
import TabelaSessoes from '../../components/TabelaSessoes';
import axios from '../../services/axios';
import { getItem } from '../../utils/storage'
import { useState } from 'react';
import { useEffect } from 'react';
import lupa from '../../assets/lupa.svg'
import plus from '../../assets/plus.svg'

function Sessoes({ page, setPage }) {
    const token = getItem('token')
    const [sessoes, setSessoes] = useState([])
    const [sessoesTotais, setSessoesTotais] = useState([])
    const [sessoesFiltradas, setSessoesFiltradas] = useState([])
    const [pesquisando, setPesquisando] = useState(false)
    const [pagina, setPagina] = useState(1)
    const [size, setSize] = useState(6)
    const [modalCadastrar, setModalCadastrar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);

    useEffect(() => {
        listarSessoes()
        setPage('sessoes')
    })


    async function listarSessoes() {
        try {
            const response = await axios.get(`/sessao?page=${pagina}&size=${size}`, {
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

        if (e.target.value !== '') {
            setPesquisando(true)
        } else {
            setPesquisando(false)
        }

        const filtrado = sessoesTotais.filter((item) => {
            return item.paciente.toUpperCase().includes(e.target.value.toUpperCase().trim());
        })

        setSessoesFiltradas(filtrado);
        console.log(sessoesFiltradas)
    }

    return (
        <div className="sessoes">

            <MenuLateral page={page} setPage={setPage} />
            <div className="sessoes-content">
                <div className="sessoes-cabecalho">
                    <h1>Minhas Sessões</h1>
                    <img src={lupa} alt='lupa' className='lupa' />
                    <input
                        placeholder='Pesquisar'
                        type="text"
                        onChange={(e) => handleFilter(e)}
                    />
                    <button onClick={() => {
                        setModalCadastrar(true)
                    }}>
                        <img src={plus} alt='plus' className='plus' />
                        
                        Nova Sessão
                    </button>

                </div>
                {pesquisando && <h1>Pesquisando</h1>}
                <TabelaSessoes
                    sessoes={pesquisando ? sessoesFiltradas : sessoes}
                    page={pagina}
                    setPage={setPagina}
                    size={size}
                    setSize={setSize}
                    sessoesTotais={sessoesTotais}
                    setModalCadastrar={setModalCadastrar}
                    setModalEditar={setModalEditar}
                    setModalExcluir={setModalExcluir}                
                    modalCadastrar={modalCadastrar}
                    modalEditar={modalEditar}
                    modalExcluir={modalExcluir}

                />
            </div>
        </div>
    );
}

export default Sessoes;

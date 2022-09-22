import './style.css';
import MenuLateral from '../../components/MenuLateral';
import TabelaPacientes from '../../components/TabelaPacientes';
import axios from '../../services/axios';
import { getItem } from '../../utils/storage';
import { useState } from 'react';
import { useEffect } from 'react';
import lupa from '../../assets/lupa.svg';
import { BsFillPersonPlusFill } from "react-icons/bs";
import { PacientesCabecalho, PacientesContainer, PacientesContent, Lupa } from './style';


function Pacientes({ page, setPage }) {
    const token = getItem('token');
    const [pacientes, setPacientes] = useState([]);
    const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
    const [pesquisando, setPesquisando] = useState(false);
    const [pacientesTotais, setPacientesTotais] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [size, setSize] = useState(6);
    const [modalCadastrar, setModalCadastrar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [modalAction, setModalAction] = useState("");
    const [modalSessoes, setModalSessoes] = useState(false);


    useEffect(() => {
        listarPacientes()
        setPage('pacientes')

    })
    async function listarPacientes() {
        try {
            const pacientesTotais = await axios.get('/paciente', {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            })

            const response = await axios.get(`/paciente?page=${pagina}&size=${size}`, {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            })

            setPacientes(response.data)
            setPacientesTotais(pacientesTotais.data)

        } catch (error) {

        }
    }

    function handleFilter(e) {

        if (e.target.value !== '') {
            setPesquisando(true)
        } else {
            setPesquisando(false)
        }

        const filtrado = pacientesTotais.filter((item) => {
            return item.nome.toUpperCase().includes(e.target.value.toUpperCase().trim());
        })

        setPacientesFiltrados(filtrado);
    }
    return (



        
        <PacientesContainer>
            <MenuLateral page={page} setPage={setPage} />
            <PacientesContent>
                <PacientesCabecalho>
                    <h1>Meus Pacientes</h1>
                    <div>
                        <Lupa src={lupa}/>
                        <input
                            type="text"
                            placeholder="Pesquisar"
                            onChange={(e) => handleFilter(e)}
                        />
                    </div>
                    <button
                        onClick={() => {
                            setModalCadastrar(true);
                            setModalAction("cadastrar");
                        }}
                    >
                        <BsFillPersonPlusFill size={20} />
                        Novo Paciente
                    </button>
                    </PacientesCabecalho>
                {pesquisando && <h1>Pesquisando</h1>}
                <TabelaPacientes
                    pacientes={pesquisando ? pacientesFiltrados : pacientes}
                    page={pagina}
                    setPage={setPagina}
                    size={size}
                    setSize={setSize}
                    pacientesTotais={pacientesTotais}
                    action={modalAction}
                    setModalCadastrar={setModalCadastrar}
                    setModalEditar={setModalEditar}
                    setModalExcluir={setModalExcluir}
                    modalCadastrar={modalCadastrar}
                    modalEditar={modalEditar}
                    modalExcluir={modalExcluir}
                    setModalAction={setModalAction}
                    modalSessoes={modalSessoes}
                    setModalSessoes={setModalSessoes}
                />
            </PacientesContent>
            </PacientesContainer>
    );

}

export default Pacientes;

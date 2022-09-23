import './style.css';
import MenuLateral from '../../components/MenuLateral';
import TabelaPacientes from '../../components/TabelaPacientes';
import { useState } from 'react';
import { useEffect } from 'react';
import lupa from '../../assets/lupa.svg';
import { BsFillPersonPlusFill } from "react-icons/bs";


function Pacientes({ page, setPage, pacientes, pacientesTotais, listarPacientes, size, setSize }) {
    const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
    const [pesquisando, setPesquisando] = useState(false);
    const [pagina, setPagina] = useState(1);
    const [modalCadastrar, setModalCadastrar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [modalAction, setModalAction] = useState("");
    const [modalSessoes, setModalSessoes] = useState(false);


    useEffect(() => {
        listarPacientes()
        setPage('pacientes')
    }/* , [pacientes, size, page] */)


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



        <div className="paciente">

            <MenuLateral page={page} setPage={setPage} />
            <div className="pacientes-content">
                <div className='pacientes-cabecalho'>
                    <h1>Meus Pacientes</h1>
                    <div>
                        <img src={lupa} alt='lupa' className='lupa' />
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
                </div>
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
            </div>
        </div>
    );

}

export default Pacientes;

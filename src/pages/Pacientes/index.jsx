import './style.css';
import MenuLateral from '../../components/MenuLateral';
import TabelaPacientes from '../../components/TabelaPacientes';
import { useState } from 'react';
import { useEffect } from 'react';
import lupa from '../../assets/lupa.svg';
import { BsFillPersonPlusFill } from "react-icons/bs";
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress';

function Pacientes({
    page,
    setPage,
    pacientes,
    pacientesTotais,
    listarPacientes,
    size,
    setSize,
    isPacientesLoading,
    setIsPacientesLoading,
    paginaPacientes,
    setPaginaPacientes
}) {
    const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
    const [pesquisando, setPesquisando] = useState(false);
    /* const [pagina, setPagina] = useState(1); */
    const [modalCadastrar, setModalCadastrar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [modalAction, setModalAction] = useState("");
    const [modalSessoes, setModalSessoes] = useState(false);


    useEffect(() => {
        listarPacientes()
        setPage('pacientes')
    }, [size, paginaPacientes, modalCadastrar, modalEditar, modalExcluir])


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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isPacientesLoading}
            >
                <CircularProgress sx={{ color: 'var(--purple)' }} />
            </Backdrop>

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
                    paginaPacientes={paginaPacientes}
                    setPaginaPacientes={setPaginaPacientes}
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
                    listarPacientes={listarPacientes}
                    isPacientesLoading={isPacientesLoading}
                    setIsPacientesLoading={setIsPacientesLoading}
                />
            </div>
        </div>
    );

}

export default Pacientes;
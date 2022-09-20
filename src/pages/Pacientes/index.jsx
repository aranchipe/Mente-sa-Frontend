
import MenuLateral from '../../components/MenuLateral';
import TabelaPacientes from '../../components/TabelaPacientes';
import axios from '../../services/axios';
import { getItem } from '../../utils/storage'
import { useState } from 'react';
import { useEffect } from 'react';
import lupa from '../../assets/lupa.svg'
import plus from '../../assets/plus.svg'
import ModalPacientes from "../../components/ModalPacientes";
import {
    Main,
    Container,
    Header,
    Table,
    IconEye,
    IconPencil,
    IconTrash,
    Tooltip,
    TooltipText,
} from "../Pacientes2/style";
import { BsFillPersonPlusFill, BsSearch } from "react-icons/bs";


function Pacientes({ page, setPage }) {
    const token = getItem('token')
    const [pacientes, setPacientes] = useState([])
    const [modalCadastrar, setModalCadastrar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [modalAction, setModalAction] = useState("");


    useEffect(() => {
        listarPacientes()
        setPage('pacientes')

    })
    async function listarPacientes() {
        try {
            const response = await axios.get('/paciente', {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            })
            setPacientes(response.data)

        } catch (error) {

        }
    }
    return (
        <div className="Main">
            < MenuLateral page={page} setPage={setPage} />
            <Header>
                <h1>Meus Pacientes</h1>
                <div>
                    <span>
                        <BsSearch />
                    </span>
                    <input type="text" name="" id="" placeholder="Pesquisar" />
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
            </Header>
            <TabelaPacientes
                action={modalAction}
                setModalCadastrar={setModalCadastrar}
                setModalEditar={setModalEditar}
                setModalExcluir={setModalExcluir}
                pacientes={pacientes}
                modalCadastrar={modalCadastrar}
                modalEditar={modalEditar}
                modalExcluir={modalExcluir}
                setModalAction={setModalAction}
            />
        </div>
    );

}

export default Pacientes;

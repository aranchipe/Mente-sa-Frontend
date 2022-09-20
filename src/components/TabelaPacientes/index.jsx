import './style.css';
import acao from '../../assets/acao.svg'
import editIcon from '../../assets/edit-icon.svg'
import deleteIcon from '../../assets/delete-icon.svg'
import ModalPacientes from "../ModalPacientes";
import { useState } from 'react';

function TabelaPacientes({
    pacientes,
    action,
    setModalCadastrar,
    setModalEditar,
    setModalExcluir,
    modalCadastrar,
    modalEditar,
    modalExcluir,
    setModalAction
}) {
    const [pacienteAtual, setPacienteAtual] = useState()
    return (
        <div className='container-paciente'>
            {modalCadastrar === true || modalEditar === true || modalExcluir === true ? (
                <ModalPacientes
                    action={action}
                    setModalCadastrar={setModalCadastrar}
                    setModalEditar={setModalEditar}
                    setModalExcluir={setModalExcluir}
                    pacienteAtual={pacienteAtual}
                />
            ) : (
                ""
            )}
            <table className='table-paciente'>
                <thead >
                    <tr>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>E-mail</th>
                        <th>Gênero</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nome}</td>
                            <td>{item.endereco}</td>
                            <td>{item.email}</td>
                            <td>{item.genero}</td>
                            <td>
                                <div className='action-icons'>
                                    <img src={acao} alt='acao' />
                                    <img
                                        src={editIcon}
                                        alt='editIcon'
                                        onClick={() => {
                                            setModalAction('editar');
                                            setModalEditar(true);
                                            setPacienteAtual(item);
                                        }} />
                                    <img src={deleteIcon} alt='deleteIcon' />

                                </div>
                            </td>
                        </tr>

                    ))}



                </tbody>

            </table>


        </div>

    )
}

export default TabelaPacientes
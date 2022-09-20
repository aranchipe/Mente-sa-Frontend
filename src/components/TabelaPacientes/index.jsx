import './style.css';
import esquerda from '../../assets/esquerda.svg'
import direita from '../../assets/direita.svg'
import acao from '../../assets/acao.svg'
import editIcon from '../../assets/edit-icon.svg'
import deleteIcon from '../../assets/delete-icon.svg'
import ModalPacientes from "../ModalPacientes";
import { useState } from 'react';

function TabelaPacientes({
    pacientes,
    pacientesTotais,
    setPage,
    setSize,
    page,
    size,
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

    function handleChangeInputSize(e) {
        setSize(e.target.value)
        console.log(pacientes)
        if (!e.target.value) {
            setSize(6)
        }
        setPage(1)
    }

    function handleNextPage() {
        if (((page - 1) * size + pacientes.length) === pacientesTotais.length) {
            return
        }
        setPage(page + 1)
    }

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

            <div className="table-footer">
                <span>Itens por página: </span>
                <input
                    type='number'
                    onChange={handleChangeInputSize}
                />
                <span>{(page - 1) * size + 1} - {(page - 1) * size + pacientes.length} de {pacientesTotais.length}</span>
                <img onClick={() => page !== 1 && setPage(page - 1)} src={esquerda} alt='esquerda' className='esquerda' />
                <img onClick={handleNextPage} src={direita} alt='direita' className='direita' />
            </div>


        </div>

    )
}

export default TabelaPacientes
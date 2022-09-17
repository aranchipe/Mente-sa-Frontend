import './style.css'
import acao from '../../assets/acao.svg'
import editIcon from '../../assets/edit-icon.svg'
import deleteIcon from '../../assets/delete-icon.svg'
import esquerda from '../../assets/esquerda.svg'
import direita from '../../assets/direita.svg'

function TabelaSessoes({ sessoes }) {


    return (
        <div className='table-completa'>
            <table className='table-sessoes'>
                <thead >
                    <tr>
                        <th>Paciente</th>
                        <th>Data de Agendamento</th>
                        <th>Status</th>
                        <th>Tema</th>
                        <th>Duração</th>
                        <th>Tipo de sessão</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sessoes.map((item) => (
                        <tr key={item.id}>
                            <td>{item.paciente}</td>
                            <td>{item.data}</td>
                            <td>
                                <div className="status">
                                    <span>{item.status}</span>
                                </div>
                            </td>

                            <td>{item.tema}</td>
                            <td>{item.duracao}</td>
                            <td>{item.tipo}</td>
                            <td>
                                <div className='action-icons'>
                                    <img src={acao} alt='acao' />
                                    <img src={editIcon} alt='editIcon' />
                                    <img src={deleteIcon} alt='deleteIcon' />

                                </div>
                            </td>
                        </tr>

                    ))}
                </tbody>

            </table>
            <div className="table-footer">
                <span>Itens por página: </span>
                <input type="text" />
                <span>1 - 6 de 100</span>
                <img src={esquerda} alt='esquerda' className='esquerda' />
                <img src={direita} alt='direita' className='direita' />
            </div>


        </div>
    )
}

export default TabelaSessoes
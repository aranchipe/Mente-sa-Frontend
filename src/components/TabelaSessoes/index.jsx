import './style.css'
import acao from '../../assets/acao.svg'
import editIcon from '../../assets/edit-icon.svg'
import deleteIcon from '../../assets/delete-icon.svg'

function TabelaSessoes() {
    return (
        <div className='sessoes-content'>
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
                    <tr>
                        <td>Lorem</td>
                        <td>dd/MM/yyyy - 00:00</td>
                        <td>
                            <div className="status">
                                <span>Agendado</span>
                            </div>
                        </td>
                        <td>Depressão</td>
                        <td>00:30</td>
                        <td>Individual</td>
                        <td>
                            <div className='action-icons'>
                                <img src={acao} alt='acao' />
                                <img src={editIcon} alt='editIcon' />
                                <img src={deleteIcon} alt='deleteIcon' />

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Lorem</td>
                        <td>dd/MM/yyyy - 00:00</td>
                        <td>
                            <div className="status">
                                <span>Agendado</span>
                            </div>
                        </td>
                        <td>Depressão</td>
                        <td>00:30</td>
                        <td>Individual</td>
                        <td>
                            <div className='action-icons'>
                                <img src={acao} alt='acao' />
                                <img src={editIcon} alt='editIcon' />
                                <img src={deleteIcon} alt='deleteIcon' />

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Lorem</td>
                        <td>dd/MM/yyyy - 00:00</td>
                        <td>
                            <div className="status">
                                <span>Agendado</span>
                            </div>
                        </td>
                        <td>Depressão</td>
                        <td>00:30</td>
                        <td>Individual</td>
                        <td>
                            <div className='action-icons'>
                                <img src={acao} alt='acao' />
                                <img src={editIcon} alt='editIcon' />
                                <img src={deleteIcon} alt='deleteIcon' />

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Lorem</td>
                        <td>dd/MM/yyyy - 00:00</td>
                        <td>
                            <div className="status">
                                <span>Agendado</span>
                            </div>
                        </td>
                        <td>Depressão</td>
                        <td>00:30</td>
                        <td>Individual</td>
                        <td>
                            <div className='action-icons'>
                                <img src={acao} alt='acao' />
                                <img src={editIcon} alt='editIcon' />
                                <img src={deleteIcon} alt='deleteIcon' />

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Lorem</td>
                        <td>dd/MM/yyyy - 00:00</td>
                        <td>
                            <div className="status">
                                <span>Agendado</span>
                            </div>
                        </td>
                        <td>Depressão</td>
                        <td>00:30</td>
                        <td>Individual</td>
                        <td>
                            <div className='action-icons'>
                                <img src={acao} alt='acao' />
                                <img src={editIcon} alt='editIcon' />
                                <img src={deleteIcon} alt='deleteIcon' />

                            </div>
                        </td>
                    </tr>
                </tbody>

            </table>


        </div>
    )
}

export default TabelaSessoes
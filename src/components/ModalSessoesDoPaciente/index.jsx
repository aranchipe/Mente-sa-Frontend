import './style.js'
import iconClose from '../../assets/icon-close.svg'
import axios from '../../services/axios'
import { getItem } from '../../utils/storage'
import { useEffect } from 'react'
import { useState } from 'react'
import { format } from 'date-fns'
import { ModalSessoesDoPacienteStyle } from './style.js'


function ModalSessoesDoPaciente({ setModalSessoes, pacienteAtual }) {
    const token = getItem('token')
    const [sessoesDoPaciente, setSessoesDoPaciente] = useState([])

    useEffect(() => {
        SessoesDoPaciente()
    }, [])

    async function SessoesDoPaciente() {
        try {
            const response = await axios.get('/sessao', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const sessoesFiltradas = response.data.filter((item) => {
                return item.paciente_id === pacienteAtual.id
            })

            setSessoesDoPaciente(sessoesFiltradas)

        } catch (error) {

        }
    }
    return (

    <ModalSessoesDoPacienteStyle>
        <div className='sessoes-pacientes-container'>
            <div className="sessoes-pacientes-modal">
                <h2>Sessões de {pacienteAtual.nome}</h2>
                <img
                    className='icon-close'
                    src={iconClose}
                    alt='icon-close'
                    onClick={() => setModalSessoes(false)}
                />
                {sessoesDoPaciente.length === 0 && <p id='nenhuma-sessao'>Nenhuma Sessão Encontrada</p>}

                {sessoesDoPaciente.map((item) => (
                    <ul key={item.id}>
                        <li><b>Sessão:</b> {item.id}</li>
                        <li><b>Data:</b> {format(new Date(item.data), 'dd/MM/yyyy')}</li>
                        <li><b>Status:</b> {item.status}</li>
                        <li><b>Tema:</b> {item.tema}</li>
                        <li><b>Duração:</b> {item.duracao}</li>
                        <li><b>Tipo:</b> {item.tipo}</li>

                    </ul>
                ))}


            </div>
        </div>
    </ModalSessoesDoPacienteStyle>
    )
}

export default ModalSessoesDoPaciente
import './style.css'
import MenuLateral from '../../components/MenuLateral';
import TabelaPacientes from '../../components/TabelaPacientes';
import axios from '../../services/axios';
import { getItem } from '../../utils/storage'
import { useState } from 'react';
import { useEffect } from 'react';
import lupa from '../../assets/lupa.svg'
import plus from '../../assets/plus.svg'

function Pacientes() {
    const token = getItem('token')
    const [pacientes, setPacientes] = useState([])

    useEffect(() => {
        listarPacientes()
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
        <div className="paciente">
            <h1>Meus Pacientes</h1>
            <MenuLateral />
            <TabelaPacientes pacientes={pacientes} />
        </div>
    );

}

export default Pacientes;

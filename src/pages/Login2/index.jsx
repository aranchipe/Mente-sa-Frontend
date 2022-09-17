import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css'
import axios from '../../services/axios'
import { setItem, getItem } from '../../utils/storage'
import { notifyError } from '../../utils/toast'
import { useNavigate } from 'react-router-dom'

function Login2() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        senha: ''
    })

    useEffect(() => {
        const token = getItem('token')
        if (token) {
            navigate('/main')
        }
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post('/login', {
                email: form.email,
                senha: form.senha
            })

            if (response.status > 204) {
                return notifyError(response.data.mensagem);
            }

            setItem('token', response.data.token);
            setItem('nome', response.data.usuario.nome)
            setItem('email', response.data.usuario.email)
            setItem('id', response.data.usuario.id)
            navigate('/main')

        } catch (error) {
            return notifyError(error.response.data.mensagem);
        }

    }

    function handleChangeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <section>
            <Link to="/Cadastro">Cadastro</Link>

            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <input
                    name='email'
                    value={form.email}
                    type="text"
                    onChange={handleChangeInput}
                />
                <input
                    name='senha'
                    value={form.senha}
                    type="password"
                    onChange={handleChangeInput}
                />
                <button>Entrar</button>
            </form>

        </section>
    )
}

export default Login2
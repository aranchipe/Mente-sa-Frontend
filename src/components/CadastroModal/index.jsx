import './style.css'
import termos from '../../assets/termos.svg'
import olho from '../../assets/olho.svg'
import { useState } from 'react'
import axios from '../../services/axios'
import { notifyError, notifySucess } from '../../utils/toast'
import { Link } from 'react-router-dom'

function CadastroModal() {
    const [typePassword, setTypePassword] = useState(true)
    const [typeConfPassword, setTypeConfPassword] = useState(true)
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        confSenha: ''
    })

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.nome) {
            return notifyError('O nome é obrigatório')
        }
        if (!form.email) {
            return notifyError('O email é obrigatório')
        }
        if (!form.senha || !form.confSenha) {
            return notifyError('Informe as senhas')
        }

        if (form.senha !== form.confSenha) {
            return notifyError('As senhas não conferem')
        }

        if (form.senha.length < 6) {
            return notifyError('A senha deve ter ao menos 6 caracteres')
        }

        try {
            await axios.post('/profissional', {
                "nome": form.nome,
                "email": form.email,
                "senha": form.senha
            }, {

            })

            setForm({
                nome: '',
                email: '',
                senha: '',
                confSenha: ''
            })
            return notifySucess('Profissional cadastrado com sucesso')


        } catch (error) {
            return notifyError(error.response.data.mensagem)

        }
    }

    function handleChangeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <div className='cadastro-modal-container'>

            <div className='titulo'>
                <h1 style={{ fontWeight: '700' }}>Mente Sã</h1>
            </div>

            <div className='sub-titulo'>
                <h2 style={{ fontWeight: '700' }}>Cadastro do Profissional</h2>
            </div>

            <form onSubmit={handleSubmit} className='cadastro-modal-form'>
                <span style={{ color: '#AAAAAA' }}>Crie sua conta e comece a desfrutar do nosso sistema</span>
                <input
                    placeholder='Nome'
                    name='nome'
                    onChange={handleChangeInput}
                    value={form.nome}
                />

                <input placeholder='E-mail'
                    name='email'
                    onChange={handleChangeInput}
                    value={form.email}
                />

                <input
                    placeholder='Senha'
                    type={typePassword ? 'password' : 'text'}
                    name='senha'
                    onChange={handleChangeInput}
                    value={form.senha}
                />

                <img className='olho1' src={olho} alt='olho' onClick={() => setTypePassword(!typePassword)} />

                <input
                    placeholder='Confirme sua senha'
                    type={typeConfPassword ? 'password' : 'text'}
                    name='confSenha'
                    onChange={handleChangeInput}
                    value={form.confSenha}
                />

                <img className='olho2' src={olho} alt='olho' onClick={() => setTypeConfPassword(!typeConfPassword)} />

                <div className="termos">
                    <img style={{ cursor: 'pointer' }} src={termos} alt='termos' />
                    <span style={{ color: '#AAAAAA' }}>Aceito os <span style={{ color: 'var(--purple)', fontWeight: '700' }}>termos</span> e <span style={{ color: 'var(--purple)', fontWeight: '700' }}>políticas de privacidade</span></span>
                </div>
                <Link style={{ textDecoration: 'none', marginTop: '10px', color: 'var(--purple)' }} to={'/login'}>Fazer Login</Link>

                <div className="botao">
                    <button type='submit'>Confirmar</button>
                </div>

            </form>
        </div>
    )
}

export default CadastroModal
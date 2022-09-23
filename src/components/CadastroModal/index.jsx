import './style.css'
import olhoAberto from '../../assets/olho-aberto.svg'
import olhoFechado from '../../assets/olho-fechado.svg'
import { useState } from 'react'
import axios from '../../services/axios'
import { notifyError, notifySucess } from '../../utils/toast'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function CadastroModal() {
    const [typePassword, setTypePassword] = useState(true)
    const [typeConfPassword, setTypeConfPassword] = useState(true)
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        confSenha: ''
    })

    const [botaoCadastro, setBotaoCadastro] = useState(true)

    useEffect(() => {

        if (form.nome && form.email && form.senha && form.confSenha) {
            setBotaoCadastro(false)
        } else {
            setBotaoCadastro(true)
        }
    }, [form])


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

                <img className='olho1' src={typePassword ? olhoAberto : olhoFechado} alt='olho' onClick={() => setTypePassword(!typePassword)} />

                <input
                    placeholder='Confirme sua senha'
                    type={typeConfPassword ? 'password' : 'text'}
                    name='confSenha'
                    onChange={handleChangeInput}
                    value={form.confSenha}
                />

                <img className='olho2' src={typeConfPassword ? olhoAberto : olhoFechado} alt='olho' onClick={() => setTypeConfPassword(!typeConfPassword)} />


                <Link style={{ textDecoration: 'none', marginTop: '10px', color: 'var(--purple)' }} to={'/login'}>Fazer Login</Link>

                <div className="botao">
                    <button disabled={botaoCadastro} type='submit' style={botaoCadastro ? { backgroundColor: 'var(--light-purple)', cursor: 'default' } : { backgroundColor: 'var(--purple)', cursor: 'pointer' }} >Confirmar</button>
                </div>

            </form>
        </div>
    )
}

export default CadastroModal
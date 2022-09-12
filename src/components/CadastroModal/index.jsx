import './style.css'
import termos from '../../assets/termos.svg'
import olho from '../../assets/olho.svg'
import { useState } from 'react'

function CadastroModal() {
    const [typePassword, setTypePassword] = useState(true)
    const [typeConfPassword, setTypeConfPassword] = useState(true)

    function handleSubmit(e) {
        e.preventDefault()
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
                <input placeholder='Nome' />

                <input placeholder='E-mail' />

                <input placeholder='Senha' type={typePassword ? 'password' : 'text'} />

                <img className='olho1' src={olho} alt='olho' onClick={() => setTypePassword(!typePassword)} />

                <input placeholder='Confirme sua senha' type={typeConfPassword ? 'password' : 'text'} />

                <img className='olho2' src={olho} alt='olho' onClick={() => setTypeConfPassword(!typeConfPassword)} />

                <div className="termos">
                    <img style={{ cursor: 'pointer' }} src={termos} alt='termos' />
                    <span style={{ color: '#AAAAAA' }}>Aceito os <span style={{ color: 'var(--purple)', fontWeight: '700' }}>termos</span> e <span style={{ color: 'var(--purple)', fontWeight: '700' }}>políticas de privacidade</span></span>
                </div>

                <div className="botao">
                    <button>Confirmar</button>
                </div>

            </form>
        </div>
    )
}

export default CadastroModal
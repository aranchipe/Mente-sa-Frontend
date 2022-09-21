import styled from 'styled-components'

export const ModalSessoesDoPacienteStyle = styled.form`

.sessoes-pacientes-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(145, 154, 150, 0.3);
    backdrop-filter: blur(4px);
    z-index: 2;
}

.sessoes-pacientes-modal {
    font-family: 'Roboto', sans-serif;

    width: 23%;
    background: #ffffff;
    max-height: 70%;
    /* border-radius: 3rem; */
    display: flex;
    flex-direction: column;
    padding: 4rem 2.8rem;
    position: relative;
    overflow-y: scroll;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #666666;
}

h2 {
    color: #6813d4;
    text-align: center;

    margin-bottom: 20px;
  }

.sessoes-pacientes-modal h2 {
    margin-bottom: 30px;
}

.sessoes-pacientes-modal ul {
    border-bottom: 1px solid #666666;
}

.icon-close {
    position: absolute;
    top: 30px;
    right: 5px;
    cursor: pointer;
}

#nenhuma-sessao{
    color: #6813d4;
    text-align: center;
}

ul li{
    
}
`
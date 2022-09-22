import styled from "styled-components";

export const PacientesContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  background-color: #EFEFEF;
  position: absolute;

`

export const PacientesContent = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 115px;
  position: relative;
`

export const PacientesCabecalho = styled.div`
display: flex;
  width: 966px;
  justify-content: space-between;
  padding-bottom: 22.5px;
  position: relative;

  input {
    all: unset;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  width: 408px;
  height: 37px;
  border: 1px solid #333333;
  border-radius: 5px;
  padding: 0 44px;
  }

  h1{
    font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
  color: #666666;
  }

  button{
    all: unset;
  margin: 0;
  box-sizing: border-box;
  padding: 0;
  width: 190px;
  height: 43px;
  background-color: #6813D5;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  }
`
export const Lupa = styled.img`
  position: absolute;
  left: 310px;
  top: 10px;
  cursor: pointer;
`;


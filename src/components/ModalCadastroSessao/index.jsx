import { Confirm, Modal } from "./style";
import { useState } from "react";



function ModalCadastroSessoes({ action, setModalCadastrar, setModalEditar, setModalExcluir }) {

  // function CadastroModal() {
  //   const [typePassword, setTypePassword] = useState(true)
  //   const [typeConfPassword, setTypeConfPassword] = useState(true)
  //   const [form, setForm] = useState({
  //       nome: '',
  //       email: '',
  //       senha: '',
  //       confSenha: ''
  //   })

  const [form, setForm] = useState('')


  function handleChangeInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
}

  async function handleSubmit(e) {
    e.preventDefault();

}


  return action === "excluir" ? (
    <Confirm>
        <h2>Cadastro de sessão</h2>
        <div>
        <button onClick={() => setModalExcluir(false)}>Cancelar</button>
        <button>Confirmar</button>
        </div>
    </Confirm>
  ) : (
    <Modal action="submit" onSubmit={handleSubmit}>
      <h2>
        {action === "cadastrar"
          ? "Cadastro da sessão"
          : action === "editar"
          ? "Editar sessão"
          : ""}
      </h2>
      <select name="" id="" placeholder="Pacientes" />
      <input type="date" name="" id="" placeholder="Data do agendamento" onChange={handleChangeInput}/>
      <input type="text" name="" id="" placeholder="Tema abordado" onChange={handleChangeInput}/>
      <input type="text" name="" id="" placeholder="Duração" onChange={handleChangeInput}/>
      <select name="" id="" placeholder="Tipo da sessão" />
      <select name="" id="" placeholder="Status">
      <option value="Agendado"></option>
      <option value="Cancelado"></option>
      <option value="Atendido"></option>
      </select>
    
      <div>
        <button
          onClick={() => {
            setModalCadastrar(false);
            setModalEditar(false);
          }}
        >
          Cancelar
        </button>
        <button type="submit">
          {action === "cadastrar" ? "Cadastrar" : "Confirmar"}
        </button>
      </div>
    </Modal>
  );
}

export default ModalCadastroSessoes;

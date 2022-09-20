/* import { useForm } from "react-hook-form"; */
import { Confirm, Modal } from "./style";
import axios from '../../services/axios'
import { getItem } from '../../utils/storage'
import { useState } from "react";
import { notifyError } from '../../utils/toast'

function ModalPacientes({ action, setModalCadastrar, setModalEditar, setModalExcluir, pacienteAtual }) {
  /* const { register, handleSubmit } = useForm(); */
  const token = getItem('token')
  const id = getItem('id')
  const { nome, data_nascimento, cpf, genero, endereco, email, telefone } = pacienteAtual


  const [form, setForm] = useState({
    profissional_id: id,
    nome,
    data_nascimento,
    cpf,
    genero,
    endereco,
    email,
    telefone
  })

  const onSubmitFunction = async (e) => {
    e.preventDefault();

    if (action === 'editar') {
      try {
        const response = await axios.put(`/paciente/${pacienteAtual.id}`, {
          ...form
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } catch (error) {
        notifyError(error.response.data.mensagem)
      }
    }
  };

  function handleChangeInput(e) {
    action === 'editar' && setForm({ ...form, [e.target.name]: e.target.value })
  }


  return action === "excluir" ? (
    <Confirm>
      <h2>Atenção</h2>
      <span>Deseja excluir paciente?</span>
      <div>
        <button onClick={() => setModalExcluir(false)}>Cancelar</button>
        <button>Confirmar</button>
      </div>
    </Confirm>
  ) : (
    <Modal action="submit" onSubmit={onSubmitFunction}>
      <h2>
        {action === "cadastrar"
          ? "Cadastro do paciente"
          : action === "editar"
            ? "Editar paciente"
            : ""}
      </h2>
      <input type="text" name="nome" id="" placeholder="Nome completo" value={form.nome} onChange={(e) => handleChangeInput(e)} />
      <input type="date" name="data_nascimento" id="" placeholder="Data de nascimento" value={form.data_nascimento} onChange={(e) => handleChangeInput(e)} />
      <input type="text" name="cpf" id="" placeholder="CPF" value={form.cpf} onChange={(e) => handleChangeInput(e)} />
      <select name="genero" id="" placeholder="Gênero" value={form.genero} onChange={(e) => handleChangeInput(e)}>
        <option value="" disabled selected>
          Gênero
        </option>
        <option value="feminino">Feminino</option>
        <option value="masculino">Masculino</option>
      </select>
      <input type="text" name="endereco" id="" placeholder="Endereço" value={form.endereco} onChange={(e) => handleChangeInput(e)} />
      <input type="email" name="email" id="" placeholder="E-mail" value={form.email} onChange={(e) => handleChangeInput(e)} />
      <input type="tel" name="telefone" id="" placeholder="Telefone" value={form.telefone} onChange={(e) => handleChangeInput(e)} />
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

export default ModalPacientes;

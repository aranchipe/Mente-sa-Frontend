import { useForm } from "react-hook-form";
import { Confirm, Modal } from "./style";
import { notifyError, notifySucess } from '../../utils/toast'
import { useState } from "react";
import axios from "axios";

function ModalCadastroSessao({ action, setModalCadastrar, setModalEditar, setModalExcluir }) {

  const [form, setForm] = useState('')

    const onSubmitFunction = (e) => {
      e.preventDefault();
    };

    function handleChangeInput(e) {
      setForm({ ...form, [e.target.name]: e.target.value })
    }

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
        <input type="date" name="" id="" placeholder="Data do agendamento" />
        <input type="text" name="" id="" placeholder="Tema abordado" />
        <input type="text" name="" id="" placeholder="Duração" />
        <select name="" id="" placeholder="Tipo da sessão" />
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

  export default ModalCadastroSessao;

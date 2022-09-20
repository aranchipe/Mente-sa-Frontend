import { useForm } from "react-hook-form";
import { Confirm, Modal } from "./style";

function ModalDeleteSessoes({ action, setModalCadastrar, setModalEditar, setModalExcluir }) {
  const { register, handleSubmit } = useForm();

  const onSubmitFunction = (e) => {
    e.preventDefault();
  };

  return action === "excluir" ? (
    <Confirm>
        <h2>Atenção</h2>
        <span>Você deseja excluir essa sessão?</span>
        <div>
        <button onClick={() => setModalExcluir(false)}>Cancelar</button>
        <button>Confirmar</button>
        </div>
    </Confirm>
  ) : (
    <Modal action="submit" onSubmit={onSubmitFunction}>
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
      <input type="text" name="" id="" placeholder="Duração"/>
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

export default ModalDeleteSessoes;

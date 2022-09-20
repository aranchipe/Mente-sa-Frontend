import { useForm } from "react-hook-form";
import { Confirm, Modal } from "./style";

function ModalEditSessoes({ action, setModalCadastrar, setModalEditar, setModalExcluir }) {
  const { register, handleSubmit } = useForm();

  const onSubmitFunction = (e) => {
    e.preventDefault();
  };

  return action === "excluir" ? (
    <Confirm>
        <h2>Atenção</h2>
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
     <span>Deseja excluir sessão?</span>
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

export default ModalEditSessoes;

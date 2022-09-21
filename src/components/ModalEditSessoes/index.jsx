/* import { useForm } from "react-hook-form"; */
import { Confirm, Modal } from "./style";

function ModalEditSessoes({ setModalEditar}) {
  /* const { register, handleSubmit } = useForm(); */

  const onSubmitFunction = (e) => {
    e.preventDefault();
  };

  return  (
    <>
    <Confirm>
      <h2>Editar sessão</h2>
      <div>
        <button onClick={() => setModalEditar(false)}>Cancelar</button>
        <button>Confirmar</button>
      </div>
    </Confirm>
    <Modal action="submit" onSubmit={onSubmitFunction}>
      <h2>
        Editar sessão
      </h2>
      <select name="" id="" placeholder="Pacientes" />
      <input type="date" name="" id="" placeholder="Data do agendamento" />
      <input type="text" name="" id="" placeholder="Tema abordado" />
      <input type="text" name="" id="" placeholder="Duração" />
      <select name="" id="" placeholder="Tipo da sessão" />
      <div>
        <button
          onClick={() => {
            setModalEditar(false);
          }}
        >
          Cancelar
        </button>
        <button type="submit">
          Editar
        </button>
      </div>
    </Modal>
    </>
  );
}

export default ModalEditSessoes;

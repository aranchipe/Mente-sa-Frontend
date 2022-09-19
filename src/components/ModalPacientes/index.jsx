/* import { useForm } from "react-hook-form"; */
import { Confirm, Modal } from "./style";

function ModalPacientes({ action, setModalCadastrar, setModalEditar, setModalExcluir }) {
  /* const { register, handleSubmit } = useForm(); */

  const onSubmitFunction = (e) => {
    e.preventDefault();
  };

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
      <input type="text" name="" id="" placeholder="Nome completo" />
      <input type="date" name="" id="" placeholder="Data de nascimento" />
      <input type="text" name="" id="" placeholder="CPF" />
      <select name="" id="" placeholder="Gênero">
        <option value="" disabled selected>
          Gênero
        </option>
        <option value="feminino">Feminino</option>
        <option value="masculino">Masculino</option>
      </select>
      <input type="text" name="" id="" placeholder="Endereço" />
      <input type="email" name="" id="" placeholder="E-mail" />
      <input type="tel" name="" id="" placeholder="Telefone" />
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

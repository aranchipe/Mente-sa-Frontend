import axios from "../../services/axios";
import { getItem } from "../../utils/storage";
import { notifyError } from "../../utils/toast";
import { Confirm } from "./style";

function ModalDeleteSessoes({ setModalExcluir, sessaoAtual }) {
  const token = getItem("token");

  const onSubmitFunction = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`/sessao/${sessaoAtual.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setModalExcluir(false);
      }
    } catch (error) {
      notifyError(error.response.data.mensagem);
    }
  };

  return (
    <>
      <Confirm onSubmit={onSubmitFunction}>
        <h2>Atenção</h2>
        <span>Você deseja excluir essa sessão?</span>
        <div>
          <button onClick={() => setModalExcluir(false)}>Cancelar</button>
          <button type="submit">Confirmar</button>
        </div>
      </Confirm>
    </>
  );
}

export default ModalDeleteSessoes;

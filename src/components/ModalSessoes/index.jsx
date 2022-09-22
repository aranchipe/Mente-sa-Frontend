import { Confirm, Modal, ModalContainer } from "./style";
import axios from "../../services/axios";
import { getItem } from "../../utils/storage";
import { useState } from "react";
import { notifyError, notifySucess } from "../../utils/toast";
import { format } from "date-fns";

function ModalSessoes({
  pacientes,
  action,
  setModalCadastrar,
  setModalEditar,
  setModalExcluir,
  sessaoAtual,
}) {
  const token = getItem("token");
  const id = getItem("id");

  const [formEditar, setFormEditar] = useState({
    profissional_id: id,
    paciente_id: sessaoAtual && sessaoAtual.paciente_id,
    data: sessaoAtual && format(new Date(sessaoAtual.data), "yyyy-MM-dd"),
    status: sessaoAtual && sessaoAtual.status,
    tema: sessaoAtual && sessaoAtual.tema,
    duracao: sessaoAtual && sessaoAtual.duracao,
    tipo: sessaoAtual && sessaoAtual.tipo,
  });

  const [formCadastrar, setFormCadastrar] = useState({
    profissional_id: id,
    paciente_id: "",
    data: "",
    status: "agendada",
    tema: "",
    duracao: "",
    tipo: "",
  });

  const onSubmitFunction = async (e) => {
    e.preventDefault();

    if (action === "editar") {
      try {
        await axios.put(
          `/sessao/${sessaoAtual.id}`,
          {
            ...formEditar,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setModalEditar(false);

        return notifySucess("Sessão alterada com sucesso");
      } catch (error) {
        notifyError(error.response.data.mensagem);
      }
    } else if (action === "cadastrar") {
      try {
        await axios.post(
          "/sessao",
          {
            ...formCadastrar,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setModalCadastrar(false);

        return notifySucess("Sessão cadastrada com sucesso");
      } catch (error) {
        return notifyError(error.response.data.mensagem);
      }
    }
  };

  function handleChangeInput(e) {
    if (action === "editar") {
      setFormEditar({ ...formEditar, [e.target.name]: e.target.value });
    } else {
      setFormCadastrar({ ...formCadastrar, [e.target.name]: e.target.value });
    }
  }

  async function handleDeleteSessao() {
    try {
      await axios.delete(`/sessao/${sessaoAtual.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setModalExcluir(false);
      return notifySucess("Sessão excluída com sucesso");
    } catch (error) {
      return notifyError("Não foi possível excluir a sessão");
    }
  }

  return action === "excluir" ? (
    <ModalContainer>
      <Confirm>
        <h2>Atenção</h2>
        <span>Deseja excluir sessão?</span>
        <div>
          <button
            onClick={() => {
              setModalExcluir(false);
            }}
          >
            Cancelar
          </button>
          <button onClick={handleDeleteSessao}>Confirmar</button>
        </div>
      </Confirm>
    </ModalContainer>
  ) : (
    <ModalContainer>
      <Modal action="submit" onSubmit={onSubmitFunction}>
        <h2>
          {action === "cadastrar"
            ? "Cadastro de sessão"
            : action === "editar"
            ? "Editar sessão"
            : ""}
        </h2>
        <select
          disabled={action === "editar"}
          name="paciente_id"
          id=""
          defaultValue={
            action === "editar" ? sessaoAtual.paciente : "pacientes"
          }
          onChange={(e) => handleChangeInput(e)}
        >
          <option disabled value="pacientes">
            Pacientes
          </option>
          {pacientes.map((paciente) => (
            <option key={paciente.id} value={paciente.id}>
              {paciente.nome}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="data"
          id=""
          onChange={(e) => handleChangeInput(e)}
        />
        <input
          type="text"
          name="tema"
          id=""
          placeholder="Tema abordado"
          defaultValue={action === "editar" ? sessaoAtual.tema : ""}
          onChange={(e) => handleChangeInput(e)}
        />
        <input
          type="text"
          name="duracao"
          id=""
          placeholder="Duração"
          defaultValue={action === "editar" ? sessaoAtual.duracao : ""}
          onChange={(e) => handleChangeInput(e)}
        />
        <select
          name="tipo"
          id="tipo"
          defaultValue={action === "editar" ? sessaoAtual.tipo : "tipo"}
          onChange={(e) => handleChangeInput(e)}
        >
          <option disabled value="tipo">
            Tipo da sessão
          </option>
          <option value="individual">Individual</option>
          <option value="casal">Casal</option>
          <option value="dupla">Dupla</option>
          <option value="grupo">Grupo</option>
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
    </ModalContainer>
  );
}

export default ModalSessoes;

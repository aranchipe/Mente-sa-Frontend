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
  listarPacientes,
  setIsPacientesLoading
}) {


  const token = getItem("token");
  const id = getItem("id");

  const [formEditar, setFormEditar] = useState({
    profissional_id: id,
    paciente_id: sessaoAtual && sessaoAtual.paciente_id,
    data: sessaoAtual && format(new Date(sessaoAtual.data), "yyyy-MM-dd HH:mm"),
    status: sessaoAtual && 'Atendido',
    tema: sessaoAtual && sessaoAtual.tema,
    duracao: sessaoAtual && sessaoAtual.duracao,
    tipo: sessaoAtual && sessaoAtual.tipo,
  });

  const [formCadastrar, setFormCadastrar] = useState({
    profissional_id: id,
    paciente_id: pacientes[0].id,
    data: "",
    status: "Agendado",
    tema: "",
    duracao: "",
    tipo: "Individual",
  });


  const onSubmitFunction = async (e) => {
    e.preventDefault();

    if (action === "editar") {

      setIsPacientesLoading(true)
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
      finally {
        setIsPacientesLoading(false)
      }
    } else if (action === "cadastrar") {
      const now = new Date()
      if (+new Date(formCadastrar.data) < +now) {
        return notifyError('Não é possível cadastrar uma sessão marcada para datas passadas')
      }
      setIsPacientesLoading(true)
      try {

        await axios.post(
          "/sessao",
          {
            ...formCadastrar
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
      } finally {
        setIsPacientesLoading(false)
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
    setIsPacientesLoading(true)
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
    } finally {
      setIsPacientesLoading(false)
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
        <h2 >
          {action === "cadastrar"
            ? "Cadastro de sessão"
            : action === "editar"
              ? "Editar sessão"
              : ""}
        </h2>
        <select
          name="paciente_id"
          id=""
          defaultValue={action === "editar" ? formEditar.paciente_id : formCadastrar.paciente_id}
          onChange={(e) => handleChangeInput(e)}
        >
          <option disabled value='Pacientes'>
            Escolha o paciente
          </option>
          {pacientes.map((paciente) => (
            <option key={paciente.id} value={paciente.id} >
              {paciente.nome}
            </option>
          ))}
        </select>
        {action === "editar" && (
          <select
            className="element"
            name="status"
            id=""
            defaultValue={formEditar.status}
            onChange={(e) => handleChangeInput(e)}
          >
            <option disabled value='Status'>
              Mude o status
            </option>
            <option value='Atendido' >
              Atendido
            </option>
            <option value='Cancelado' >
              Cancelado
            </option>
          </select>

        )}

        <input
          type="datetime-local"
          name="data"
          id=""
          onChange={(e) => handleChangeInput(e)}
          value={(action === "editar" ? formEditar : formCadastrar).data}
        />

        <input
          type="text"
          name="tema"
          id=""
          placeholder="Tema abordado"
          value={(action === "editar" ? formEditar : formCadastrar).tema}
          onChange={(e) => handleChangeInput(e)}
        />
        <input
          type="time"
          name="duracao"
          id=""
          placeholder="Duração"
          value={(action === "editar" ? formEditar : formCadastrar).duracao}
          onChange={(e) => handleChangeInput(e)}
        />
        <select
          name="tipo"
          id="tipo"
          value={(action === "editar" ? formEditar : formCadastrar).tipo}
          onChange={(e) => handleChangeInput(e)}
        >
          <option disabled value="tipo">
            Tipo da sessão
          </option>
          <option value="Individual">Individual</option>
          <option value="Casal">Casal</option>
          <option value="Dupla">Dupla</option>
          <option value="Grupo">Grupo</option>
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
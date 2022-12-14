import { Confirm, Modal, ModalContainer } from "./style";
import axios from "../../services/axios";
import { getItem } from "../../utils/storage";
import { useState } from "react";
import { notifyError, notifySucess } from "../../utils/toast";
import { format } from "date-fns";
import MaskedInput from "../../utils/MaskedInput";


function ModalPacientes({
  action,
  setModalCadastrar,
  setModalEditar,
  setModalExcluir,
  pacienteAtual,
  temSessoes,
  setTemSessoes,
  setIsPacientesLoading
}) {
  const token = getItem("token");
  const id = getItem("id");

  const [formEditar, setFormEditar] = useState({
    profissional_id: id,
    nome: pacienteAtual && pacienteAtual.nome,
    data_nascimento:
      pacienteAtual &&
      format(new Date(pacienteAtual.data_nascimento), "yyyy-MM-dd"),
    cpf: pacienteAtual && pacienteAtual.cpf,
    genero: pacienteAtual && pacienteAtual.genero,
    endereco: pacienteAtual && pacienteAtual.endereco,
    email: pacienteAtual && pacienteAtual.email,
    telefone: pacienteAtual && pacienteAtual.telefone,
  });

  const [formCadastrar, setFormCadastrar] = useState({
    profissional_id: id,
    nome: "",
    data_nascimento: "",
    cpf: "",
    genero: "",
    endereco: "",
    email: "",
    telefone: "",
  });

  const onSubmitFunction = async (e) => {
    e.preventDefault();

    if (action === "editar") {
      try {
        await axios.put(
          `/paciente/${pacienteAtual.id}`,
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

        return notifySucess("Paciente alterado com sucesso");
      } catch (error) {
        notifyError(error.response.data.mensagem);
      }
    } else if (action === "cadastrar") {
      try {
        await axios.post(
          "/paciente",
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

        return notifySucess("Paciente cadastrado com sucesso");
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

  async function handleDeletePaciente() {
    setIsPacientesLoading(true)
    try {
      if (temSessoes) {
        await axios.delete(`/sessoes/${pacienteAtual.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      await axios.delete(`/paciente/${pacienteAtual.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setModalExcluir(false);
      setTemSessoes(false);
      return notifySucess("Paciente exclu??do com sucesso");
    } catch (error) {
      return notifyError("N??o foi poss??vel excluir o paciente");
    } finally {
      setIsPacientesLoading(false)
    }
  }

  return action === "excluir" ? (
    <ModalContainer>
      <Confirm>
        <h2>Aten????o</h2>
        {temSessoes ? (
          <span>
            Este paciente possui sess??es cadastradas!
            <br /> Deseja excluir mesmo assim?
          </span>
        ) : (
          <span>Deseja excluir paciente?</span>
        )}

        <div>
          <button
            onClick={() => {
              setModalExcluir(false);
              setTemSessoes(false);
            }}
          >
            Cancelar
          </button>
          <button onClick={handleDeletePaciente}>Confirmar</button>
        </div>
      </Confirm>
    </ModalContainer>
  ) : (
    <ModalContainer>
      <Modal action="submit" onSubmit={onSubmitFunction}>
        <h2>
          {action === "cadastrar"
            ? "Cadastro do paciente"
            : action === "editar"
              ? "Editar paciente"
              : ""}
        </h2>
        <input
          type="text"
          name="nome"
          id=""
          placeholder="Nome completo"
          value={(action === "editar" ? formEditar : formCadastrar).nome}
          onChange={(e) => handleChangeInput(e)}
        />
        <input
          type="date"
          name="data_nascimento"
          id=""
          placeholder="Data de nascimento"
          value={
            (action === "editar" ? formEditar : formCadastrar).data_nascimento
          }
          onChange={(e) => handleChangeInput(e)}
        />

        <MaskedInput
          name='cpf'
          mask='999.999.999-99'
          value={(action === "editar" ? formEditar : formCadastrar).cpf}
          onChange={(e) => handleChangeInput(e)}
          placeholder='CPF'
        />
        <select
          name="genero"
          id=""
          placeholder="G??nero"
          value={(action === "editar" ? formEditar : formCadastrar).genero}
          onChange={(e) => handleChangeInput(e)}
        >
          <option value="" >
            G??nero
          </option>
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
        </select>
        <input
          type="text"
          name="endereco"
          id=""
          placeholder="Endere??o"
          value={(action === "editar" ? formEditar : formCadastrar).endereco}
          onChange={(e) => handleChangeInput(e)}
        />
        <input
          type="email"
          name="email"
          id=""
          placeholder="E-mail"
          value={(action === "editar" ? formEditar : formCadastrar).email}
          onChange={(e) => handleChangeInput(e)}
        />

        <MaskedInput
          name='telefone'
          mask='(99)9.9999-9999'
          value={(action === "editar" ? formEditar : formCadastrar).telefone}
          onChange={(e) => handleChangeInput(e)}
          placeholder='Telefone'
        />
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

export default ModalPacientes;

/* import { useForm } from "react-hook-form"; */
import { useState } from "react";
import axios from "../../services/axios";
import { getItem } from "../../utils/storage";
import { notifyError } from "../../utils/toast";
import { Confirm, Modal } from "./style";

function ModalEditSessoes({ setModalEditar, sessaoAtual }) {
  
  const token = getItem("token");
  const professionalId = getItem("id");

  const [formEditar, setFormEditar] = useState({
    profissional_id: professionalId,
    paciente_id: 1,
    data: sessaoAtual.data,
    status: sessaoAtual.status,
    tema: sessaoAtual.tema,
    duracao: sessaoAtual.duracao,
    tipo: sessaoAtual.tipo
  });


  const onSubmitFunction = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/sessao/${sessaoAtual.id}`, {
        ...formEditar
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 200){
        setModalEditar(false)
      }
    } catch (error) {
      notifyError(error.response.data.mensagem)
    }
  };

  function handleChangeInput(e) {
    setFormEditar({ ...formEditar, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Confirm>
        <h2>Editar sessão</h2>
        <div>
          <button onClick={() => setModalEditar(false)}>Cancelar</button>
          <button>Confirmar</button>
        </div>
      </Confirm>
      <Modal action="submit" onSubmit={onSubmitFunction}>
        <h2>Editar sessão</h2>
        <input
        type='text'
        disabled
          name="paciente"
          id=""
          placeholder="Pacientes"
          value={sessaoAtual.paciente}
        />
        <input
          type="date"
          name="data"
          id=""
          placeholder="Data do agendamento"
          onChange={(e) => handleChangeInput(e)}
        />
        <input
          type="text"
          name="tema"
          id=""
          placeholder="Tema abordado"
          onChange={(e) => handleChangeInput(e)}
        />
        <input
          type="text"
          name="duracao"
          id=""
          placeholder="Duração"
          onChange={(e) => handleChangeInput(e)}
        />
        <select name="tipo" id="" placeholder="Tipo da sessão" onChange={(e) => handleChangeInput(e)}>
          <option value="" disabled selected>Tipo da sessão</option>
          <option value="individual">Individual</option>
          <option value="dupla">Dupla</option>
          <option value="casal">Casal</option>
          <option value="grupo">Grupo</option>
        </select>
        <div>
          <button
            onClick={() => {
              setModalEditar(false);
            }}
          >
            Cancelar
          </button>
          <button type="submit">Editar</button>
        </div>
      </Modal>
    </>
  );
}

export default ModalEditSessoes;

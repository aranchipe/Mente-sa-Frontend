import "./style.css";
import esquerda from "../../assets/esquerda.svg";
import direita from "../../assets/direita.svg";
import acao from "../../assets/acao.svg";
import editIcon from "../../assets/edit-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import ModalPacientes from "../ModalPacientes";
import { useState } from "react";
import ModalSessoesDoPaciente from "../ModalSessoesDoPaciente";
import axios from "../../services/axios";
import { getItem } from "../../utils/storage";

function TabelaPacientes({
  pacientes,
  pacientesTotais,
  setPage,
  setSize,
  page,
  size,
  action,
  setModalCadastrar,
  setModalEditar,
  setModalExcluir,
  modalCadastrar,
  modalEditar,
  modalExcluir,
  setModalAction,
  modalSessoes,
  setModalSessoes,
}) {
  const token = getItem("token");

  const [temSessoes, setTemSessoes] = useState(false);
  const [pacienteAtual, setPacienteAtual] = useState();
  function handleChangeInputSize(e) {
    setSize(e.target.value);
    if (!e.target.value) {
      setSize(6);
    }
    setPage(1);
  }

  function handleNextPage() {
    if ((page - 1) * size + pacientes.length === pacientesTotais.length) {
      return;
    }
    setPage(page + 1);
  }

  async function verificarSessoes(id) {
    try {
      const response = await axios.get("/sessao", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sessoesDoPaciente = response.data.filter((item) => {
        return item.paciente_id === id;
      });

      if (sessoesDoPaciente.length) {
        setTemSessoes(true);
      }
    } catch (error) {}
  }

  return (
    <>
      {modalSessoes && (
        <ModalSessoesDoPaciente
          pacienteAtual={pacienteAtual}
          setModalSessoes={setModalSessoes}
        />
      )}
      {(modalCadastrar || modalEditar || modalExcluir) && (
        <ModalPacientes
          action={action}
          setModalCadastrar={setModalCadastrar}
          setModalEditar={setModalEditar}
          setModalExcluir={setModalExcluir}
          pacienteAtual={pacienteAtual}
          temSessoes={temSessoes}
          setTemSessoes={setTemSessoes}
        />
      )}
      <div className="container-paciente">
        <table className="table-paciente">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Endereço</th>
              <th>E-mail</th>
              <th>Gênero</th>
              <th>Ações</th>             
            </tr>
          </thead>
          <tbody>
            {pacientes.map((item) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.endereco}</td>
                <td>{item.email}</td>
                <td>{item.genero}</td>
                <td>
                  <div className="action-icons">
                    <img
                      src={acao}
                      alt="acao"
                      onClick={() => {
                        setModalSessoes(true);
                        setPacienteAtual(item);
                      }}
                    />
                    <img
                      src={editIcon}
                      alt="editIcon"
                      onClick={() => {
                        setModalAction("editar");
                        setModalEditar(true);
                        setPacienteAtual(item);
                      }}
                    />
                    <img
                      src={deleteIcon}
                      alt="deleteIcon"
                      onClick={() => {
                        setModalAction("excluir");
                        setModalExcluir(true);
                        setPacienteAtual(item);
                        verificarSessoes(item.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span>Itens por página: </span>
          <select onChange={handleChangeInputSize}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6" defaultValue="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>            
          </select>
          
          <span>
            {(page - 1) * size + 1} - {(page - 1) * size + pacientes.length} de{" "}
            {pacientesTotais.length}
          </span>
          <img
            onClick={() => page !== 1 && setPage(page - 1)}
            src={esquerda}
            alt="esquerda"
            className="esquerda"
          />
          <img
            onClick={handleNextPage}
            src={direita}
            alt="direita"
            className="direita"
          />
        </div>
      </div>
    </>
  );
}

export default TabelaPacientes;

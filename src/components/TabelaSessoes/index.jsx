import "./style.css";
import editIcon from "../../assets/edit-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import esquerda from "../../assets/esquerda.svg";
import direita from "../../assets/direita.svg";
import { format } from "date-fns";
import { useState } from "react";
import ModalSessoes from "../ModalSessoes";

function TabelaSessoes({
  sessoes,
  pagina,
  setPagina,
  sizeSessoes,
  setSizeSessoes,
  sessoesTotais,
  setModalCadastrar,
  setModalEditar,
  setModalExcluir,
  modalCadastrar,
  modalEditar,
  modalExcluir,
  action,
  setModalAction,
  pacientes,
  listarPacientes,
  setIsPacientesLoading
}) {
  const [sessaoAtual, setSessaoAtual] = useState();

  function handleChangeInputSize(e) {
    setSizeSessoes(e.target.value);
    if (!e.target.value) {
      setSizeSessoes(6);
    }
    setPagina(1);
  }

  function handleNextPage() {
    if ((pagina - 1) * sizeSessoes + sessoes.length === sessoesTotais.length) {
      return;
    }
    setPagina(pagina + 1);
  }


  return (
    <>
      {(modalCadastrar || modalEditar || modalExcluir) && (
        <ModalSessoes
          action={action}
          setModalCadastrar={setModalCadastrar}
          setModalEditar={setModalEditar}
          setModalExcluir={setModalExcluir}
          pacientes={pacientes}
          sessaoAtual={sessaoAtual}
          listarPacientes={listarPacientes}
          setIsPacientesLoading={setIsPacientesLoading}
        />
      )}
      <div className="table-completa">
        <table className="table-sessoes">
          <thead>
            <tr>
              <th>Paciente</th>
              <th >Data de Agendamento</th>
              <th>Status</th>
              <th>Tema</th>
              <th>Duração</th>
              <th>Tipo de sessão</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sessoes.map((item) => (
              <tr key={item.id}>
                <td>{item.paciente}</td>
                <td>{format(new Date(+new Date(item.data) + 10800000), "dd/MM/yyyy HH:mm")}</td>
                <td>
                  <div
                    className={
                      item.status === "Cancelado"
                        ? "status cancelado"
                        : item.status === "Atendido"
                          ? "status atendido"
                          : item.status === "Expirado"
                            ? "status expirado"
                            : "status agendado"
                    }
                  >
                    <span>{item.status}</span>
                  </div>
                </td>
                <td>{item.tema}</td>
                <td>{item.duracao}</td>
                <td>{item.tipo}</td>
                <td>
                  <div className="action-icons">
                    <img
                      src={editIcon}
                      alt="editIcon"
                      onClick={() => {
                        setSessaoAtual(item);
                        setModalEditar(true);
                        setModalAction("editar");
                      }}
                    />
                    <img
                      src={deleteIcon}
                      alt="deleteIcon"
                      onClick={() => {
                        setSessaoAtual(item);
                        setModalExcluir(true);
                        setModalAction("excluir");
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
          <select defaultValue='6' onChange={handleChangeInputSize}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <span>
            {(pagina - 1) * sizeSessoes + 1} - {(pagina - 1) * sizeSessoes + sessoes.length} de{" "}
            {sessoesTotais.length}
          </span>
          <img
            onClick={() => pagina !== 1 && setPagina(pagina - 1)}
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

export default TabelaSessoes;
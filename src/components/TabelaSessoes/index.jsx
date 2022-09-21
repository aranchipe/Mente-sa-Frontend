import "./style.css";
import acao from "../../assets/acao.svg";
import editIcon from "../../assets/edit-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import esquerda from "../../assets/esquerda.svg";
import direita from "../../assets/direita.svg";
import { format } from "date-fns";
import ModalCadastroSessao from "../ModalCadastroSessao";
import ModalEditSessoes from "../ModalEditSessoes";
import ModalDeleteSessoes from "../ModalDeleteSessoes";

function TabelaSessoes({
  sessoes,
  page,
  setPage,
  size,
  setSize,
  sessoesTotais,
  setModalCadastrar,
  setModalEditar,
  setModalExcluir,
  modalCadastrar,
  modalEditar,
  modalExcluir,
}) {
  function handleChangeInputSize(e) {
    setSize(e.target.value);
    console.log(sessoes);
    if (!e.target.value) {
      setSize(6);
    }
    setPage(1);
  }

  function handleNextPage() {
    if ((page - 1) * size + sessoes.length === sessoesTotais.length) {
      return;
    }
    setPage(page + 1);
  }

  return (
    <div className="table-completa">
      {modalCadastrar ? <ModalCadastroSessao setModalCadastrar={setModalCadastrar} /> : ""}
      {modalEditar ? <ModalEditSessoes setModalEditar={setModalCadastrar} /> : ""}
      {modalExcluir ? <ModalDeleteSessoes setModalExcluir={setModalCadastrar} /> : ""}
      <table className="table-sessoes">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Data de Agendamento</th>
            <th>Status</th>
            <th>Tema</th>
            <th>Duração</th>
            <th>Tipo de sessão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sessoes.map((item, indice) => (
            <tr
              className={indice % 2 === 0 ? "linha-branca" : ""}
              key={item.id}
            >
              <td>{item.paciente}</td>
              <td>{format(new Date(item.data), "dd/MM/yyyy")}</td>
              <td>
                <div
                  className={
                    item.status === "Cancelado"
                      ? "status cancelado"
                      : item.status === "Atendido"
                      ? "status atendido"
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
                  <img src={acao} alt="acao" />
                  <img src={editIcon} alt="editIcon" onClick={() => setModalEditar(true)}/>
                  <img src={deleteIcon} alt="deleteIcon" onClick={() => setModalExcluir(true)}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <span>Itens por página: </span>
        <input type="number" onChange={handleChangeInputSize} />
        <span>
          {(page - 1) * size + 1} - {(page - 1) * size + sessoes.length} de{" "}
          {sessoesTotais.length}
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
  );
}

export default TabelaSessoes;

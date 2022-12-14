import "./style.css";
import MenuLateral from "../../components/MenuLateral";
import TabelaSessoes from "../../components/TabelaSessoes";
import { useState } from "react";
import { useEffect } from "react";
import lupa from "../../assets/lupa.svg";
import plus from "../../assets/plus.svg";
import { notifyError } from "../../utils/toast";
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress';

function Sessoes({
  page,
  setPage,
  pacientesTotais,
  listarSessoes,
  sessoesTotais,
  sessoes,
  setSessoes,
  pagina,
  setPagina,
  isSessoesLoading,
  sizeSessoes,
  setSizeSessoes,
  setIsPacientesLoading,
  listarPacientes
}) {
  const [sessoesFiltradas, setSessoesFiltradas] = useState([]);
  const [pesquisando, setPesquisando] = useState(false);
  const [modalCadastrar, setModalCadastrar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [modalAction, setModalAction] = useState("");


  useEffect(() => {
    listarSessoes();
    listarPacientes()
    setPage("sessoes");
  }, [pagina, sizeSessoes, modalCadastrar, modalExcluir, modalEditar]);


  function handleFilter(e) {
    if (e.target.value !== "") {
      setPesquisando(true);
    } else {
      setPesquisando(false);
    }

    const filtrado = sessoesTotais.filter((item) => {
      return item.paciente
        .toUpperCase()
        .includes(e.target.value.toUpperCase().trim());
    });

    setSessoesFiltradas(filtrado);
  }

  function handleNovaSessao() {
    if (pacientesTotais.length === 0) {
      return notifyError('Você não possui um paciente para cadastrar uma nova sessão')
    }
    setModalCadastrar(true);
    setModalAction("cadastrar");
  }

  return (

    <div className="sessoes">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSessoesLoading}
      >
        <CircularProgress sx={{ color: 'var(--purple)' }} />
      </Backdrop>
      <MenuLateral page={page} setPage={setPage} />
      <div className="sessoes-content">
        <div className="sessoes-cabecalho">
          <h1 >Minhas Sessões</h1>
          <img src={lupa} alt="lupa" className="lupa" />
          <input
            placeholder="Pesquisar"
            type="text"
            onChange={(e) => handleFilter(e)}
          />
          <button
            onClick={handleNovaSessao}
          >
            <img
              src={plus}
              alt="plus"
              className="plus"
            />
            Nova Sessão
          </button>
        </div>
        <TabelaSessoes
          sessoes={pesquisando ? sessoesFiltradas : sessoes}
          setSessoes={setSessoes}
          pagina={pagina}
          setPagina={setPagina}
          sizeSessoes={sizeSessoes}
          setSizeSessoes={setSizeSessoes}
          sessoesTotais={sessoesTotais}
          setModalCadastrar={setModalCadastrar}
          setModalEditar={setModalEditar}
          setModalExcluir={setModalExcluir}
          modalCadastrar={modalCadastrar}
          modalEditar={modalEditar}
          modalExcluir={modalExcluir}
          pacientes={pacientesTotais}
          action={modalAction}
          setModalAction={setModalAction}
          setIsPacientesLoading={setIsPacientesLoading}
        />
      </div>
    </div>
  );
}

export default Sessoes;
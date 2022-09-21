import './style.css';
import MenuLateral from '../../components/MenuLateral';

function Sessoes() {
    return (
<<<<<<< Updated upstream
        <div className="Main">
            <h1>Sessões</h1>
            <MenuLateral></MenuLateral>
=======
        <div className="sessoes">

            <MenuLateral page={page} setPage={setPage} />
            <div className="sessoes-content">
                <div className="sessoes-cabecalho">
                    <h1>Minhas Sessões</h1>
                    <img src={lupa} alt='lupa' className='lupa' />
                    <input
                        placeholder='Pesquisar'
                        type="text"
                        onChange={(e) => handleFilter(e)}
                    />
                    <button>
                        <img src={plus} alt='plus' className='plus'/>
                        onClick={() => {
                            setModalCadastrar(true);
                            setShowModal(true)}/>
                            }
                        Nova Sessão
                    </button>

                </div>
                {pesquisando && <h1>Pesquisando</h1>}
                <TabelaSessoes
                    sessoes={pesquisando ? sessoesFiltradas : sessoes}
                    page={pagina}
                    setPage={setPagina}
                    size={size}
                    setSize={setSize}
                    sessoesTotais={sessoesTotais}
                    setModalCadastrar={setModalCadastrar}
                    setModalEditar={setModalEditar}
                    setModalExcluir={setModalExcluir}                
                    modalCadastrar={modalCadastrar}
                    modalEditar={modalEditar}
                    modalExcluir={modalExcluir}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </div>
>>>>>>> Stashed changes
        </div>
    );
}

export default Sessoes;

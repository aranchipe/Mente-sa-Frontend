import './style.css';
import MenuLateral from '../../components/MenuLateral';
import TabelaSessoes from '../../components/TabelaSessoes';

function Sessoes() {
    return (
        <div className="sessoes">
            <MenuLateral />
            <TabelaSessoes />
        </div>
    );
}

export default Sessoes;

import {
  Main,
  Container,
  Header,
  Table,
  IconEye,
  IconPencil,
  IconTrash,
  Tooltip,
  TooltipText,
} from "./style";
import { BsFillPersonPlusFill, BsSearch } from "react-icons/bs";

import MenuLateral from "../../components/MenuLateral";
import ModalPacientes from "../../components/ModalPacientes";

import { useState } from "react";

function Pacientes() {
  const [modalCadastrar, setModalCadastrar] = useState(false);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [modalAction, setModalAction] = useState("");

  return (
    <Main>
      <MenuLateral />
      <Container>
        {modalCadastrar === true || modalEditar === true || modalExcluir === true ? (
          <ModalPacientes
            action={modalAction}
            setModalCadastrar={setModalCadastrar}
            setModalEditar={setModalEditar}
            setModalExcluir={setModalExcluir}
          />
        ) : (
          ""
        )}
        <Header>
          <h1>Meus Pacientes</h1>
          <div>
            <span>
              <BsSearch />
            </span>
            <input type="text" name="" id="" placeholder="Pesquisar" />
          </div>
          <button
            onClick={() => {
              setModalCadastrar(true);
              setModalAction("cadastrar");
            }}
          >
            <BsFillPersonPlusFill size={20} />
            Novo Paciente
          </button>
        </Header>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Endereço</th>
              <th>E-mail</th>
              <th>Gênero</th>
              <th>Estado</th>
              <th>Município</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tfoot>
            <td colSpan={7}>
              <span>
                Itens por página: <input type="text" name="" id="" />
              </span>
              <span>1 - 6 de 10</span>
              <button>&lt;</button>
              <button>&gt;</button>
            </td>
          </tfoot>
          <tbody>
            <tr>
              <td>Lorem Ipsum</td>
              <td>Lorem Ipsum</td>
              <td>email@mail.com</td>
              <td>Lorem Ipsum</td>
              <td>DF</td>
              <td>Lorem Ipsum</td>
              <td>
                <Tooltip>
                  <IconEye onClick={() => setModalVisualizar(true)} />
                  <TooltipText>Ficha de anamnese</TooltipText>
                </Tooltip>
                <Tooltip>
                  <IconPencil
                    onClick={() => {
                      setModalAction("editar");
                      setModalEditar(true);
                    }}
                  />
                  <TooltipText>Editar paciente</TooltipText>
                </Tooltip>
                <Tooltip>
                  <IconTrash
                    onClick={() => {
                      setModalAction("excluir");
                      setModalExcluir(true);
                    }}
                  />
                  <TooltipText>Deletar paciente</TooltipText>
                </Tooltip>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Main>
  );}
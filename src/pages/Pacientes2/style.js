import styled from "styled-components";
import { BsEyeFill, BsFillPencilFill, BsFillTrash2Fill } from "react-icons/bs";

export const Main = styled.div`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  color: var(--dark-grey);

  button,
  svg {
    cursor: pointer;
  }
`;

export const Container = styled.div`
  width: 80vw;
  min-height: 70vh;

  padding: 20px;

`;

export const Header = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 2em;

  h1 {
    color: var(--dark-grey);
  }

  div {
    width: 40%;
    height: 85%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding: 10px;
    border: 1px solid var(--outline-grey);
    border-radius: 3px;

    color: var(--medium-grey);

    input {
      outline: none;
      border: none;

      width: 100%;

      margin-left: 10px;
    }

    svg {
      cursor: default;
    }
  }

  button {
    width: 200px;
    height: 85%;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    color: var(--white);
    font-size: 0.9rem;

    border: none;
    border-radius: 5px;

    background-color: var(--purple);
  }
`;

export const IconEye = styled(BsEyeFill)`
  color: var(--blue);
  font-size: 20px;
`;

export const IconPencil = styled(BsFillPencilFill)`
  color: var(--purple);
  font-size: 20px;
`;

export const IconTrash = styled(BsFillTrash2Fill)`
  color: var(--red);
  font-size: 20px;
`;

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;

  :hover span {
    visibility: visible;
  }
`;

export const TooltipText = styled.span`
  visibility: hidden;

  width: 120px;

  top: 100%;
  left: 50%;

  margin-left: -60px;

  background-color: var(--outline-grey);

  color: var(--white);
  text-align: center;
  font-size: 0.8rem;

  border-radius: 6px;

  padding: 5px 0;

  position: absolute;
  z-index: 1;
`;

export const Table = styled.table`
  width: 100%;
  height: 80%;

  box-shadow: 8px 8px 20px 1px rgba(0, 0, 0, 0.3);

  th,
  td {
    text-align: left;

    padding: 10px;
    line-height: 36px;
  }

  thead {
    background-color: var(--purple);

    color: var(--white);
  }

  tbody {
    tr:nth-child(2n + 1) {
      background-color: var(--light-grey);
    }

    tr td:last-child {
      height: 100%;

      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }

  tfoot {
    background-color: var(--white);
    border-top: 1px solid var(--purple);

    height: 36px;

    td {
      padding: 10px;
      text-align: right;

      input {
        outline: none;
        border: none;
        border-radius: 5px;

        background-color: var(--light-grey);
        color: var(--medium-grey);

        width: 30px;
        height: 30px;

        text-align: center;
      }

      button {
        background-color: transparent;
        border: none;
      }

      span,
      button {
        margin: 0 10px;
      }
    }
  }
`;



import styled from "styled-components";

export const Modal = styled.form`
  height: fit-content;
  width: 25%;

  padding: 15px;

  margin-left: 25%;
  background-color: #ffffff;

  position: absolute;

  border-radius: 10px;

  box-shadow: 8px 8px 20px 1px rgba(0, 0, 0, 0.3);


  h2 {
    color: #6813d4;
    text-align: center;

    margin-bottom: 20px;
  }

  input,
  select {
    height: 50px;
    width: 100%;

    outline: none;

    margin-bottom: 15px;

    color: #aaaaaa;
    font-size: 1rem;

    border: 1px solid #333333;
    border-radius: 5px;

    background-color: transparent;

    ::placeholder {
      color: #aaaaaa;
    }
  }

  div {
    width: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    button {
      width: 30%;
      height: 50px;

      margin-left: 15px;
    }

    button {
      border: none;
      border-radius: 5px;

      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);

      background-color: #d51342;

      color: #ffffff;
      font-size: 1rem;
    }

    button:last-child:disabled {
      background-color: rgba(104, 19, 213, 0.5);
    }

    button:last-child{
      background-color: #6813D5;
    }
  }
`;

export const Confirm = styled.div`
height: fit-content;
  width: 25%;

  padding: 15px;

  margin-left: 25%;
  background-color: #ffffff;

  position: absolute;

  border-radius: 10px;

  box-shadow: 8px 8px 20px 1px rgba(0, 0, 0, 0.3);

  h2 {
    color: #6813d4;
    text-align: center;

    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--purple);
  }

  span{
    text-align: center;
    margin-bottom: 20px;

    display: inline-block;
    width: 100%;

    font-size: 1.1rem;
    color: var(--medium-grey);
  }

  div {
    width: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    button {
      width: 50%;
      height: 50px;

      margin-left: 15px;
    }

    button {
      border: none;
      border-radius: 5px;

      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);

      background-color: #d51342;

      color: #ffffff;
      font-size: 1rem;
    }

    button:last-child{
      background-color: #6813D5;
    }
  }
`
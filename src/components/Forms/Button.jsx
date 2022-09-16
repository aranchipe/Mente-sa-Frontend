import React from 'react'
import styled from 'styled-components'

const Entrar = styled.button`
    font-size: 2rem;
    color: #fff;
    background-color: ${({ cor }) => cor};
    border: 2px solid black;
    border-radius: 5px;
    padding: 0.5rem;
`;
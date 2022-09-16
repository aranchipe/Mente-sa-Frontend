import React from "react";
import { Link } from 'react-router-dom'
import Input from "../../components/Forms/Input";
import Button from "../../components/Forms/Button";
import './style.css'


function Login() {
   const [username, setUsername] = React.useState('');
   const [password, setPassword] = React.useState('');

   function handleSubmit(event) {
    event.preventDefault();
   }

    return (
        <section>
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <Input label="Usuário" type="text" name="username"/>
                <Input label="Senha" type="password" name="password"/>
                <Button>Entrar</Button>
            </form>
           
        </section>
    )
}

export default Login
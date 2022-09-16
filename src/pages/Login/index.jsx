import React from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Forms/Input";
import Button from "../../components/Forms/Button";
import useForm from "../../Hooks/useForm";
import './style.css'


function Login() {
    const username = useForm('email');
    const password = useForm();
    console.log(username.validate());

function handleSubmit(event) {
    event.preventDefault();

    if(username.validate() && password.validate()){

        fetch('https://', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
        .then((response) =>{
            console.log(response);
            return response.json();
        })
        .then((json)=> {
            console.log(json)
        });
    }
}

    return (
        <section>
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <Input label="Usuário" type="text" name="username" {...username}/>
                <Input label="Senha" type="password" name="password" {...password}/>
                <Button>Entrar</Button>
            </form>
           <Link to="./Cadastro/Cadastro">Cadastro</Link>
        </section>
    )
}

export default Login
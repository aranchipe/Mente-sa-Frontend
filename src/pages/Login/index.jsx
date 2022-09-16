import React from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Forms/Input";
import Button from "../../components/Forms/Button";
import useForm from "../../Hooks/useForm";
import './style.css'


function Login() {
<<<<<<< HEAD
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <section>
            <Link to="/Cadastro">Cadastro</Link>

            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <input
                    value={username}
                    type="text" onChange={({ target }) => setUsername
                        (target.value)} />
                <input
                    value={password}
                    type="text" onChange={({ target }) => setPassword
                        (target.value)} />
                <button>Entrar</button>
            </form>

=======
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
>>>>>>> abe81f9404c16bb43bed2a65e375e24bd05f2a74
        </section>
    )
}

export default Login
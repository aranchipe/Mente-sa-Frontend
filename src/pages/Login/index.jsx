import React from "react";
import { Link } from 'react-router-dom'
import './style.css'


function Login() {
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
                 type="text" onChange={({target}) => setUsername
                (target.value)}/>
                <input 
                 value={password}
                 type="text" onChange={({target}) => setPassword
                (target.value)}/>
                <button>Entrar</button>
            </form>
           
        </section>
    )
}

export default Login
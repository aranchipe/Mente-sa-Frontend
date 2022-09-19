import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import axios from '../../services/axios';
import { setItem, getItem } from '../../utils/storage';
import { notifyError } from '../../utils/toast';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import mindfull from "../../assets/mindfull.png";
//import { Button, FormGroup } from 'reactstrap';

function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        senha: ''
    })

    useEffect(() => {
        const token = getItem('token')
        if (token) {
            navigate('/main')
        }
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post('/login', {
                email: form.email,
                senha: form.senha
            })

            if (response.status > 204) {
                return notifyError(response.data.mensagem);
            }

            setItem('token', response.data.token);
            setItem('nome', response.data.usuario.nome)
            setItem('email', response.data.usuario.email)
            setItem('id', response.data.usuario.id)
            navigate('/main')

        } catch (error) {
            return notifyError(error.response.data.mensagem);
        }

    }

    function handleChangeInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (

        <div class="container col-11 col-md-9" id="form-container">
            <div class="row align-items-center gx-5">
                <div class="col-md-6 order-md-2">
                    <section>
                        <h1>Mente Sa</h1>
                        <h5>Bem vindo ao sistema</h5>
                        <p>Por favor entre com sua conta</p>
                        <form action="" onSubmit={handleSubmit}>
                            <div class="form-floating mb-3">
                                <input
                                    id="email"
                                    name="email"
                                    class="form-control"
                                    value={form.email}
                                    type="email"
                                    onChange={handleChangeInput}
                                    placeholder="Digite o seu e-mail"
                                />
                                <label for="email" class="form-label">Digite o seu e-mail</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input
                                    id="password"
                                    name="senha"
                                    class="form-control"
                                    value={form.senha}
                                    type="password"
                                    onChange={handleChangeInput}
                                    placeholder="Digite a sua senha"
                                />
                                <label for="password" class="form-label">Digite a sua senha</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" checked type="checkbox" id="lembrar" value="option1" />
                                <label class="form-check-label" for="lembrar">Lembrar usuario</label>
                            </div>
                            <input type="submit" class="btn btn-primary" value="Entrar" />
                        </form>
                    </section>
                </div>
                <div class="col-md-6 order-md-1">
                    <div class="col-12">
                        <img src={mindfull} alt="" srcset="" class="img-fluid" />
                    </div>
                    <div class="col-12 links" id="link-container">
                        <div class="d-flex justify-content-between">
                            <a href="">Esqueci minha senha</a>
                            <Link to="/Cadastro">Criar Conta</Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
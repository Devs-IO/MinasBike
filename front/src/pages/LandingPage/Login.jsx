import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Button from 'components/Button';
import Input from './Input';
import Error from 'components/Error';

import formatFieldErrors from 'utils/formatFieldErrors';
import api from 'services/api';
import logo from 'assets/images/logo-white.png';
import emailIcon from 'assets/icons/email.svg';
import passwordIcon from 'assets/icons/password.svg';
import './styles.css';

function Login({ history }) {
    const [serverError, setServerError] = useState('');

    function handleSubmit(values, { setSubmitting, setErrors }) {
        setSubmitting(true);
        setServerError('');
        api.post('/sessions', values)

            .then(response => {
                sessionStorage.setItem('token', response.data.token);
                api.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${response.data.token}`;
                history.push('/produtos');
            })

            .catch(err => {
                console.log(err);

                const { data } = err.response;
                if (data.message) setErrors(formatFieldErrors(data));
                else setServerError('Erro interno do servidor');
            })
            .finally(setSubmitting(false));
    }

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
        >
            <Form className="login-container">
                <div className="logo-container">
                    <img src={logo} alt="Minas Bike logo" />
                </div>
                <Input
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    required
                    autoFocus
                    icon={emailIcon}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Senha"
                    required
                    icon={passwordIcon}
                />
                <Button type="submit" color="#DC2438">
                    Acessar
                </Button>

                <span>
                    Ainda não tem conta?{' '}
                    <Link to="/cadastrar">Registre-se</Link>
                </span>
                {serverError !== '' && <Error>{serverError}</Error>}
            </Form>
        </Formik>
    );
}

export default withRouter(Login);

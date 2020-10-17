import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from 'components/layout/Layout';
import { Formulario, Campo, InputSubmit, Error } from 'components/ui/Formulario';
import firebase from 'firebase/index';
import useValidacion from 'hooks/useValidacion';
import validarIniciarSesion from 'validacion/validarIniciarSesion';

const ESTADO_INICIAL = {
    email: '',
    password: ''
}

const Login = () => {

    const [error, setError] = useState( false );

    const { 
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    } = useValidacion( ESTADO_INICIAL, validarIniciarSesion, iniciarSesion );

    const { email, password } = valores;
    
    async function iniciarSesion() {
        try {
            await firebase.login( email, password );
            Router.push('/');
        } catch ( error ) {
            console.error('Hubo un error al autenticar el usuario', error.message );
            setError( error.message );
        }
    }

    return (  
        <div>
            <Layout> 
                <>
                    <h1
                        css={css`
                            text-align: center;
                            margin: 5rem auto;
                        `}
                    > Iniciar Sesión </h1>
                    <Formulario
                        onSubmit={ handleSubmit }
                        noValidate
                    >
                        <Campo>
                            <label htmlFor="email"> Email </label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="email@example.com"
                                name="email"
                                value={ email }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                            />
                        </Campo>
                        { errores.email && <Error>{ errores.email }</Error>}

                        <Campo>
                            <label htmlFor="password"> Password </label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="***********"
                                name="password"
                                value={ password }
                                onChange={ handleChange }
                                onBlur={ handleBlur }
                            />
                        </Campo>
                        { errores.password && <Error>{ errores.password }</Error>}

                        { error && <Error>{ error }</Error>}
                        <InputSubmit 
                            type="submit"
                            value="Iniciar Sesión"
                        />
                    </Formulario>
                </>
            </Layout>
        </div>
    );
}
 
export default Login;
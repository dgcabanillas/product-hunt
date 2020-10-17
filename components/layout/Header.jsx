import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Buscar from '../ui/Buscar';
import Nav from './Nav';
import Boton from 'components/ui/Boton';
import { FirebaseContext } from 'firebase/index.js';

const HeaderContainer = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto', serif;
    margin-right: 2rem;
    &:hover{
        cursor: pointer;
    }
`;

const Header = () => {

    const { usuario, firebase } = useContext(FirebaseContext);

    return (  
        <header
            css={css`
                border-bottom: 2px solid var(--gris-3);
                padding: 1rem 0;
            `}
        >
            <HeaderContainer>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <Link href='/'> 
                        <Logo> P </Logo> 
                    </Link>
                    <Buscar />
                    <Nav />
                </div>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    { usuario ? 
                        <>
                            <p
                                css={css`
                                    margin-right: 2rem;
                                `}
                            > Hola: { usuario.displayName } </p>
                            <Boton 
                                bgColor
                                onClick={ () => firebase.cerrarSesion() }
                            > Cerrar Sesion </Boton>
                        </> 
                        : 
                        <>
                            <Link href='/login'> 
                                <Boton bgColor> Login </Boton>
                            </Link>
                            <Link href='/crear-cuenta'> 
                                <Boton> Crear Cuenta </Boton> 
                            </Link>
                        </> 
                    }
                </div>
            </HeaderContainer>
        </header>
    );
}
 
export default Header;
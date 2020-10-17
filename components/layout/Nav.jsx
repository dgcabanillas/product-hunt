import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { FirebaseContext } from 'firebase/index.js';

const Navbar = styled.nav`
    padding-left: 2rem;
    a {
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--gris-2);
        &:last-of-type {
            margin-right: 0;
        }
    }
`;

const Nav = () => {

    const { usuario } = useContext( FirebaseContext );

    return (  
        <Navbar>
            <Link href='/'> Inicio </Link>
            <Link href='/populares'> Populares </Link>
            { usuario && <Link href='/nuevo-producto'> Nuevo Producto </Link> }
        </Navbar>
    );
}
 
export default Nav;
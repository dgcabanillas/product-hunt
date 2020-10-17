import React from 'react';
import Header from './Header';
import { Global, css } from '@emotion/core';
import Head from 'next/head';

const Layout = props => {
    return (  
        <>
            <Global
                styles={css`
                    :root {
                        --gris: #3d3d3d;
                        --gris-2: #6f6f6f;
                        --gris-3: #e1e1e1;
                        --naranja: #da552f;
                    }
                    html {
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }
                    *, *:before, *:after {
                        box-sizing: inherit;
                    }
                    body {  
                        font-size: 1.6rem;
                        line-height: 1.5;
                    }
                    h1, h2, h3 {
                        margin: 0 0 2rem 0;
                        line-height: 1.5;
                    }
                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }
                    a {
                        text-decoration: none;
                    }
                    img {
                        width: 100%;
                    }
                `}
            />
            <Head> 
                <html lang='es' />
                <title> Product Hunt with Firebase and Next </title>
            </Head>
            <Header />
            <main>
                { props.children }
            </main>
        </>
    );
}

export default Layout;
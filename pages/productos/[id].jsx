import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { FirebaseContext } from 'firebase/index.js';
import Layout from 'components/layout/Layout';
import Error404 from 'components/layout/404';
import { Campo, InputSubmit } from 'components/ui/Formulario';
import Boton from 'components/ui/Boton';

const ContenedorProducto = styled.div`
    @media(min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;

const Producto = () => {

    const [ producto, setProducto ] = useState({});
    const [ error, setError ] = useState( false );
    const [ comentario, setComentario ] = useState({});
    const [ consultarDB, setConsultarDB ]  = useState( true );

    const router = useRouter();
    const { query: { id }} = router;

    const { firebase, usuario } = useContext( FirebaseContext );

    useEffect( () => {
        if( id && consultarDB ) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection( 'productos' ).doc( id );
                const productoResult = await productoQuery.get();
                if( productoResult.exists ) {
                    setProducto( productoResult.data() );
                } else {
                    setError( true );
                }
                setConsultarDB( false );
            }
            obtenerProducto();
        }
    }, [ id ]);

    if( Object.keys( producto ).length === 0 && !error ) return 'Cargando ...';

    const { 
        comentarios, 
        creado, 
        descripcion,
        empresa,
        nombre,
        url,
        urlImagen,
        votos,
        votantes,
        creador
    } = producto;

    const votarProducto = () => {
        if( !usuario ) return router.push('/login');

        if( !votantes.includes( usuario.uid )) {
            firebase.db
                .collection( 'productos' )
                .doc( id )
                .update({ 
                    votos: votos + 1, 
                    votantes: [ ...votantes, usuario.uid ] 
                });
            
            setProducto({
                ...producto,
                votos: votos + 1, 
                votantes: [ ...votantes, usuario.uid ] 
            });
        }     
        setConsultarDB( true );
    }

    const comentarioChange = e => {
        setComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    const esCreador = id => {
        if( creador.id === id ) return true;
        return false;
    }

    const agregarComentario = e => {
        e.preventDefault();
        if( !usuario ) return router.push('/login');
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;
        firebase.db
            .collection( 'productos' )
            .doc( id )
            .update({ 
                comentarios: [...comentarios, comentario]
            });

        setProducto({
            ...producto,
            comentarios: [...comentarios, comentario]
        });
        setConsultarDB( true );
    }

    const puedeBorrar = () => {
        if( !usuario ) return false;
        if( creador.id === usuario.uid ) return true;
        return false;
    }

    const eliminarProducto = async () => {
        if( !usuario ) return router.push('/login');
        if( creador.id !== usuario.uid ) return router.push('/');
        
        try {
            await firebase.db
                .collection( 'productos' )
                .doc( id )
                .delete();
            router.push('/');
        } catch ( err ) {

        }
    }

    return (  
        <Layout>
            <>
                { error ? 
                    <Error404 /> 
                    :
                    <div className="contenedor">
                        <h1
                            css={css`
                                text-align: center;
                                margin-top: 5rem;
                            `}
                        >{ nombre }</h1>
                        <ContenedorProducto>
                            <div>
                                <p> Publicado hace { formatDistanceToNow( new Date( creado ), { locale: es })} </p>
                                { creador && <p> Por: { creador.nombre } de { empresa } </p> }
                                <img src={ urlImagen } alt={ nombre }/>
                                <p>{ descripcion }</p>
                                { usuario && (
                                    <>
                                        <h2> Agrega tu comentario </h2>
                                        <form
                                            onSubmit={ agregarComentario }
                                        >
                                            <Campo>
                                                <input 
                                                    type="text"
                                                    name="mensaje"
                                                    onChange={ comentarioChange }
                                                />
                                            </Campo>
                                            <InputSubmit 
                                                type="submit"
                                                value="Agregar Comentario"
                                            />
                                        </form>
                                    </>
                                )}
                                <h2
                                    css={css`
                                        margin: 2rem 0;
                                    `}
                                > Comentarios </h2>
                                { comentarios.length === 0 ?
                                    <p> Aún no hay comentarios </p>
                                    :
                                    <ul>
                                        { 
                                            comentarios.map( (comentario, i) => {
                                                return (
                                                    <li
                                                        key={`${comentario.usuarioId}-${i}`}
                                                        css={css`
                                                            border: 1px solid #e1e1e1;
                                                            padding: 2rem;
                                                        `}
                                                    >
                                                        <p>{ comentario.mensaje }</p>
                                                        <p>
                                                            Escrito por 
                                                            <span
                                                                css={css`
                                                                    font-weight: bold;
                                                                `}
                                                            > { comentario.usuarioNombre } </span>
                                                        </p>
                                                        { 
                                                            esCreador( comentario.usuarioId ) && 
                                                            <CreadorProducto> Es Creador </CreadorProducto>    
                                                        }
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                }
                            </div>
                            <aside>
                                <Boton 
                                    target="_blank"
                                    bgColor
                                    href={ url }
                                > Visitar URL </Boton>
                                <div css={css`
                                    margin-top: 3rem;
                                `}>
                                    <p css={css`
                                        text-align: center;
                                    `}>{ votos } votos</p>
                                    { usuario && 
                                        <Boton
                                            onClick={ votarProducto }
                                        > Votar </Boton> 
                                    }
                                </div>
                            </aside>
                        </ContenedorProducto>
                        { 
                            puedeBorrar() && 
                            <Boton
                                onClick={ eliminarProducto }
                            > Borrar Producto </Boton> 
                        }
                    </div>
                }
            </>
        </Layout>
    );
}
 
export default Producto;
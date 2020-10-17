import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Layout from 'components/layout/Layout';
import { Formulario, Campo, InputSubmit, Error } from 'components/ui/Formulario';
import { FirebaseContext } from 'firebase/index.js';
import useValidacion from 'hooks/useValidacion';
import validarCrearProducto from 'validacion/validarCrearProducto';
import Error404 from 'components/layout/404';

const ESTADO_INICIAL = {
    nombre: '',
    empresa: '',
    imagen: '',
    url: '',
    descripcion: ''
}

const NuevoProducto = () => {

    const [ nombreImagen, setNombreImagen ] = useState('');
    const [ subiendo, setSubiendo ] = useState( false );
    const [ progreso, setProgreso ] = useState( 0 );
    const [ urlImagen, setUrlImagen ] = useState('');

    const { usuario, firebase } = useContext( FirebaseContext );
    const router = useRouter();

    const { 
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    } = useValidacion( ESTADO_INICIAL, validarCrearProducto, crearProducto );

    const { nombre, empresa, imagen, url, descripcion } = valores;
    
    async function crearProducto() {
        if( !usuario )  return router.push('/login');

        const producto = {
            nombre,
            empresa,
            url,
            urlImagen,
            descripcion,
            votos: 0,
            votantes: [],
            comentarios: [],
            creado: Date.now(),
            creador: {
                id: usuario.uid,
                nombre: usuario.displayName
            }
        }

        firebase.db.collection('productos').add( producto );
        return router.push('/');
    }   

    const handleUploadStart = () => {
        setProgreso( 0 );
        setSubiendo( true );
    };
    const handleProgress = progreso => setProgreso({ progreso });
    const handleUploadError = error => {
        setSubiendo( true );
        console.error( error );
    };
    const handleUploadSuccess = nombre => {
        setProgreso( 100 );
        setSubiendo( false );
        setNombreImagen( nombre );
        firebase
            .storage
            .ref( "productos" )
            .child( nombre )
            .getDownloadURL()
            .then( url => setUrlImagen( url ));
    };

    return (  
        <div>
            <Layout> 
                { !usuario ?
                    <Error404 />
                    :
                    <>
                        <h1
                            css={css`
                                text-align: center;
                                margin: 5rem auto;
                            `}
                        > Nuevo Producto </h1>
                        <Formulario
                            onSubmit={ handleSubmit }
                            noValidate
                        >
                            <fieldset>
                                <legend> Campos Generales </legend>
                                <Campo>
                                    <label htmlFor="nombre"> Producto </label>
                                    <input 
                                        type="text" 
                                        id="nombre" 
                                        placeholder="Nombre del Producto"
                                        name="nombre"
                                        value={ nombre }
                                        onChange={ handleChange }
                                        onBlur={ handleBlur }
                                    />
                                </Campo>
                                { errores.nombre && <Error>{ errores.nombre }</Error>}

                                <Campo>
                                    <label htmlFor="empresa"> Empresa </label>
                                    <input 
                                        type="text" 
                                        id="empresa" 
                                        placeholder="Tu Empresa"
                                        name="empresa"
                                        value={ empresa }
                                        onChange={ handleChange }
                                        onBlur={ handleBlur }
                                    />
                                </Campo>
                                { errores.empresa && <Error>{ errores.empresa }</Error>}

                                <Campo>
                                    <label htmlFor="imagen"> Imagen </label>
                                    <FileUploader
                                        accept="image/*"
                                        id="imagen" 
                                        name="imagen"
                                        randomizeFilename
                                        storageRef={ firebase.storage.ref('productos') } 
                                        onUploadStart={ handleUploadStart }
                                        onUploadError={ handleUploadError }
                                        onUploadSuccess={ handleUploadSuccess }
                                        onProgress={ handleProgress }
                                    />
                                </Campo>

                                <Campo>
                                    <label htmlFor="url"> URL </label>
                                    <input 
                                        type="url" 
                                        id="url" 
                                        name="url"
                                        placeholder="URL de tu producto"
                                        value={ url }
                                        onChange={ handleChange }
                                        onBlur={ handleBlur }
                                    />
                                </Campo>
                                { errores.url && <Error>{ errores.url }</Error>}
                            </fieldset>

                            <fieldset>
                                <legend> Sobre tu Producto </legend>
                                <Campo>
                                    <label htmlFor="descripcion"> Descripcion </label>
                                    <textarea 
                                        id="descripcion" 
                                        name="descripcion"
                                        value={ descripcion }
                                        onChange={ handleChange }
                                        onBlur={ handleBlur }
                                    />
                                </Campo>
                                { errores.descripcion && <Error>{ errores.descripcion }</Error>}
                            </fieldset>
                            
                            <InputSubmit 
                                type="submit"
                                value="Crear Producto"
                            />
                        </Formulario>
                    </>
                }
            </Layout>
        </div>
    );
}
 
export default NuevoProducto;
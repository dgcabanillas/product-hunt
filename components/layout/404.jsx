import React from 'react';
import { css } from '@emotion/core';

const Error404 = () => {
    return (  
        <h1
            css={css`
                margin-top: 5rem;
                text-align: center;
            `}
        > La página no se encuentra disponible en estos momentos. Intente iniciar sesión. </h1>
    );
}
 
export default Error404;
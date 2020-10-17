import styled from '@emotion/styled';

export const Formulario = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;
    fieldset {
        margin: 2rem 0;
        border: 1px solid #a1a1a1;
        font-size: 1.4rem;
        padding: 2rem;
    }
    legend {
        padding: 0 1rem;
    }
`;

export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    label {
        flex: 0 0 150px;
        font-size: 1.6rem;
    }
    input,
    textarea {
        flex: 1;
        padding: 1rem;
    }
    textarea {
        height: 200px;
    }
`

export const InputSubmit = styled.input`
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #fff;
    font-size: 1.5rem;
    text-transform: uppercase;
    border: none;
    font-family: 'Roboto', serif;
    &:hover {
        cursor: pointer;
    }
`;

export const Error = styled.p`
    background-color: red;
    padding: 1rem;
    font-family: 'Roboto', serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
`;
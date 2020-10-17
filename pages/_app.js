import 'normalize.css';
import 'public/css/app.css';
import App from 'next/app';
import firebase, { FirebaseContext } from 'firebase/index';
import useAutenticacion from 'hooks/useAutenticacion';

const MyApp = ({ Component, pageProps }) => {
    const usuario = useAutenticacion();
    return (
        <FirebaseContext.Provider
            value={{
              firebase,
              usuario
            }}
        >
            <Component {...pageProps} />
        </FirebaseContext.Provider>
    )
}

export default MyApp

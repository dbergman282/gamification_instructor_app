import '../styles/globals.css';
import { FirebaseProvider } from '../utils/firebaseContext';

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}

export default MyApp;

// pages/_app.tsx
import "../app/globals.css"; // Correct the path as per your structure
import 'select2/dist/css/select2.min.css';
//import '../styles/globals.css'; // your global styles
import '../app/globals.css';


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

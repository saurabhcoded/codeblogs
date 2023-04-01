import Layout from '@/layout/Layout';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/dist/ReactToastify.css";
import '@/styles/globals.css'
import { useEffect } from 'react'
import { Context } from '@/context/globalContext';
import { ToastContainer } from 'react-toastify';
import MaterialTheme from '@/layout/MaterialTheme';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.js");
  })
  return (
    <Context>
      <ToastContainer />
      <MaterialTheme>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MaterialTheme>
    </Context>
  )
}

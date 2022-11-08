import "../styles/globals.css";
import "../_layouts/assets/css/index.css"
import type { AppProps } from "next/app";
import Layout from "../_layouts";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

import "../styles/globals.css";
import "../_layouts/assets/css/index.css";
import type { AppProps } from "next/app";
import Layout from "../_layouts";
// import store from "../_modules/redux/store";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";

export default function App({ Component, ...rest } : any ) {
   const {store, props : { pageProps }} = wrapper.useWrappedStore(rest);
   return (
      <Provider store={store}>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </Provider>
   );
}

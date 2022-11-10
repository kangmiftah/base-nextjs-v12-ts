import "../styles/globals.css";
import "../_layouts/assets/css/index.css";
import type { AppProps } from "next/app";
import Layout from "../_layouts";
// import store from "../_modules/redux/store";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
   getLayout?: (page: ReactElement) => ReactNode
 }
 
 type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout
 }

export default function App({ Component, ...rest } : AppPropsWithLayout ) {
   const {store, props : { pageProps }} = wrapper.useWrappedStore(rest);
   const getLayout = Component.getLayout ?? ((page) => page)
   return (
      <Provider store={store}>
         {/* <Layout> */}
         {getLayout(<Component {...pageProps} />)}
         {/* </Layout> */}
      </Provider>
   );
}

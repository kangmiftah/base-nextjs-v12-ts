import "../styles/globals.css";
import "../components/_adminLayouts/assets/css/index.css";
import type { AppProps } from "next/app";
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

 function Page({pageProps, Component} : { pageProps: any | {}, Component: NextPageWithLayout },){
   const getLayout = Component.getLayout ?? ((page : any) => page)
   return getLayout(<Component {...pageProps} />)
 }

export default function App({ Component, ...rest } : AppPropsWithLayout ) {
   const {store, props : { pageProps }} = wrapper.useWrappedStore(rest);
  
   return (
      <Provider store={store}>
         <Page Component={Component} pageProps={pageProps} />
      </Provider>
   );
}

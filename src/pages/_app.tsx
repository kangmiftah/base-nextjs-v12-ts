import "../styles/globals.css";
import "../components/_adminLayouts/assets/css/index.css";
import type { AppProps } from "next/app";
// import store from "../_modules/redux/store";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import {LoadingPage, Alert} from "../components";
import { layoutStateType } from "../@types/redux";
import { useSelector } from "react-redux";
import { layoutSelector } from "../redux/slices/layouts/layoutSlice";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
   getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout;
};

function Page({
   pageProps,
   Component,
}: {
   pageProps: any | {};
   Component: NextPageWithLayout;
}) {
   const getLayout = Component.getLayout ?? ((page: any) => page);
   const layoutState: layoutStateType = useSelector(layoutSelector);
   return (
      <>
         <LoadingPage isLoading={layoutState.loading.isLoading}>
            {layoutState.loading.loadingText}
         </LoadingPage>
         <Alert />
         {getLayout(<Component {...pageProps} />)};
      </>
   );
}

export default function App({ Component, ...rest }: AppPropsWithLayout) {
   const {
      store,
      props: {
         pageProps: { session, ...pageProps },
      },
   } = wrapper.useWrappedStore(rest);
   return (
      <>
         <Head>
            <title>E-Commerce App</title>
         </Head>
         <SessionProvider
            refetchInterval={5 * 60}
            // Re-fetches session when window is focused
            refetchOnWindowFocus={true}
            session={session}
         >
            <Provider store={store}>
               <Page Component={Component} pageProps={pageProps} />
            </Provider>
         </SessionProvider>
      </>
   );
}

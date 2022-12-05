import Document, { Head, Main, NextScript, Html } from "next/document";
import { NextPage } from "next/types";
import React from "react";

export default function MyDocument(): JSX.Element {
  return (
    <Html className="scroll-smooth hover:scroll-auto">
      <Head >
       
      </Head>
      <body className="overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

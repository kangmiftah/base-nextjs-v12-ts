import Document, { Head, Main, NextScript, Html } from "next/document";
import { NextPage } from "next/types";
import React from "react";

export default function MyDocument(): JSX.Element {
  return (
    <Html className="scroll-smooth hover:scroll-auto">
      <Head>
        {/* <link rel="stylesheet" href="/_next/static/style.css" /> */}

        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        {/* <title>React App</title> */}
      </Head>
      <body className="">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <title>Bot-board</title>
        <meta name="description" content="Just a bot helping you onboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

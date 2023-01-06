import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { fontFamilyClassName } from "../configs/font-family.config";
import { customTheme } from "../configs/theme.config";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import "@/styles/animations.css";
import "@/styles/colors.css";
import "@/styles/globals.css";

config.autoAddCss = false;
library.add(faArrowLeft, faArrowRight)

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Trip Evolved</title>
        <meta
          name="description"
          content="Sua trip a dois precisa ser mais do que um pacote pronto. Utilizamos tecnologia para recomendar destinos e experiências únicas. Simule a sua trip ideal."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={customTheme}>
        <div className={fontFamilyClassName}>
          <Component {...pageProps} />
        </div>
      </ChakraProvider>
    </>
  );
};

export default App;

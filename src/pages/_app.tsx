import GoogleScripts from "@/libs/google-scripts";
import "@/styles/index.scss";
import { AppProvider } from "mars-ds";
import type { AppProps } from "next/app";
import NextLink from "next/link";

const LinkComponent = ({ url, ...props }: any) => {
  return <NextLink href={url} {...props} />;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleScripts />
      <AppProvider linkComponent={LinkComponent}>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

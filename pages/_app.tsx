import Head from "next/head";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import { parseCookies } from "nookies";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "../components/Navbar";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>PoS-app-v2</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>

      {/* <Route /> */}

      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <CSSReset />
          {router.pathname !== "/" && <Navbar />}
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

import "@/styles/globals.css";
import { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import React, { ReactElement, ReactNode } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { NextPage } from "next";
import getDefaultLayout from "@/components/layouts/DefaultLayout";
import { ModalsProvider } from "@mantine/modals";
import { modals } from "@/utils/modals/modals";
import { SessionProvider } from "next-auth/react";
import AuthGuard from "@/components/auth/AuthGuard";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => JSX.Element;
} & {
  isPublic?: boolean;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                colorScheme: "light",
              }}
            >
              <ModalsProvider modals={modals}>
                <AuthGuard Component={Component} pageProps={pageProps} />
              </ModalsProvider>
            </MantineProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

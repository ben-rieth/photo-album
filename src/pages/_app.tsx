import { type AppType } from "next/app";
import { Merienda, Caveat } from '@next/font/google';
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NextNProgress from 'nextjs-progressbar';

import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const merienda = Merienda({ subsets: ['latin'], variable: '--font-merienda', display: 'swap'})
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', adjustFontFallback: false });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <div className={`${merienda.variable} ${caveat.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
        
        <NextNProgress options={{ showSpinner: false }}/>
        <Toaster />

      </SessionProvider>
    </QueryClientProvider>
  );
};

export default MyApp;

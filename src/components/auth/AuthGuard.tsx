import { NextPageWithLayout } from "@/pages/_app";
import { useSession } from "next-auth/react";
import getDefaultLayout from "../layouts/DefaultLayout";
import { useEffect, useState } from "react";
import SplashScreen from "../screens/SplashScreen";
import LoginForm from "./LoginForm";

interface AuthGuardProps {
  Component: NextPageWithLayout;
  pageProps: any;
}

const AuthGuard = ({ Component, pageProps }: AuthGuardProps) => {
  const session = useSession();
  const getLayout = Component.getLayout || getDefaultLayout;
  const isAuthenticated =
    session.status == "authenticated" || session.data != null;
  const canBrowse = Component.isPublic || isAuthenticated;

  // This is so that splash screen is only show once
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    if (session.status != "loading") {
      setShowSplash(false);
    }
  }, [session, showSplash]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return canBrowse ? getLayout(<Component {...pageProps} />) : <LoginForm />;
};

export default AuthGuard;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../redux/store";
import localStorage from "../lib/localStorage";
import Auth from "../components/auth";

const isPublicPage = (pathName) => {
  const publicPages = ["login", "forgot-password", "signup"];
  // Check for exact match with '/' for the application page
  if (pathName === "/") {
    return true;
  }

  return publicPages.some((element) => pathName.includes(element));
};

// Routes to render in Auth guard Component
const isAuthPage = (pathName) => {
  const authPage = ["application"];
  return authPage.some(
    (element) => pathName && element.split("/").includes(pathName)
  );
};

function MyApp({
  Component,
  pageProps: { protectedRoute = true, ...pageProps },
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (protectedRoute) {
      const tokens = localStorage.getToken();
      const isProtectedPath = isAuthPage(
        window.location.pathname.split("/")[1]
      );
      console.log("isProtectedPath", isProtectedPath);
      if (tokens && tokens.accessToken && tokens.refreshToken) {
        setLoading(false);
      } else if (isProtectedPath) {
        window.location.replace(`/login`);
      } else {
        setLoading(false);
      }
    }
  }, [router]);
  const page = (Component.getLayout &&
    Component.getLayout(<Component {...pageProps} />)) ||
    // to set different layout for different pages eg Dashboard, Public, API Docs etc use this
    (isPublicPage(router.pathname) && <Component {...pageProps} />) || (
      <Component {...pageProps} />
    );

  // Wrap the page in Auth Guard Component if it's a protected page
  const wrappedAuthStore = (
    <>
      <Head>
        {process.env.NEXT_PUBLIC_APP_ENVIRONMENT_TYPE === "development" ? (
          <meta name="robots" content="noindex" />
        ) : null}
        <link rel="" href="https://fonts.googleapis.com" />
      </Head>
      <Provider store={store}>
        {isAuthPage(router.pathname.split("/")[1]) ? (
          !loading ? (
            <Auth>{page}</Auth>
          ) : null
        ) : (
          page
        )}
      </Provider>
    </>
  );

  return wrappedAuthStore;
}

export default MyApp;

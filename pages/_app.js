import Layout from "@/components/Layout";
import React from "react";
import "../sass/styles.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;

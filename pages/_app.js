import React from "react";
import "../sass/styles.scss";
import { Provider } from "react-redux";
import store from "utils/store";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;

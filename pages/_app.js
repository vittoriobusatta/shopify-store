import React from "react";
import "../sass/styles.scss";
import { Provider } from "react-redux";
import { store, persistor } from "utils/store";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </PersistGate>
    </>
  );
}

export default MyApp;

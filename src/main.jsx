import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as JotaiProvider } from "jotai";
import { SnackbarProvider } from "notistack";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <JotaiProvider>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </PersistGate>
      </JotaiProvider>
    </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as JotaiProvider } from "jotai";
import { SnackbarProvider } from "notistack";
import App from "./App.jsx";

// Create a new div element
const rootDiv = document.createElement("div");
rootDiv.id = "chatbot-root";

// Append the div to the body (or another element) - adjust as needed
document.body.appendChild(rootDiv);

ReactDOM.createRoot(rootDiv).render(
  <React.StrictMode>
    <JotaiProvider>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </JotaiProvider>
  </React.StrictMode>
);

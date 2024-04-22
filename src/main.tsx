import React, {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { ChakraProvider } from "@chakra-ui/react";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>
);

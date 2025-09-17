import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ColorModeProvider } from "./components/ui/color-mode";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { queryClient } from "../utils/queryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster position="top-center" />
            <App />
          </QueryClientProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);

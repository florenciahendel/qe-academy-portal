import React from "react";
import ReactDOM from "react-dom/client";

import {
  MantineProvider,
  createTheme,
} from "@mantine/core";
import "@mantine/core/styles.css";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

const theme = createTheme({
  primaryColor: "petrol",
  colors: {
    petrol: [
      "#E6F4F5",
      "#CCE9EB",
      "#99D3D7",
      "#66BDC3",
      "#33A7AF",
      "#0F4C5C",
      "#0D4351",
      "#0A3945",
      "#083039",
      "#05262D",
    ],
  },
  fontFamily:
    "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  headings: {
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  },
  defaultRadius: "md",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      theme={theme}
      defaultColorScheme="light"
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);
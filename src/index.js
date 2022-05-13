import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import CryptoContextAPI from "./CryptoContextAPI";

ReactDOM.render(
  <React.StrictMode>
    <CryptoContextAPI>
      <App />
    </CryptoContextAPI>
  </React.StrictMode>,
  document.getElementById("root")
);

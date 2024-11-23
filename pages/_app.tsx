/* eslint-disable @typescript-eslint/no-require-imports */
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";

function ReceitasDaXimiWeb({Component, pageProps} : AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <Component {...pageProps} />;
}

export default ReceitasDaXimiWeb;
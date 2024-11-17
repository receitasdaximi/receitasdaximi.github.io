import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";
import { useEffect } from "react";

function ReceitasDaXimiWeb({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <Component {...pageProps} />;
}

export default ReceitasDaXimiWeb;
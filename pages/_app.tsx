import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

let docInit: Document;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [Dom, setDom] = useState<Document>(docInit);

  useEffect(() => {
    setDom(document);
  }, []);

  const changeBodyColor = () => {
    if (Dom !== undefined) {
      const bd = Dom.querySelector("body");

      if (bd !== null) {
        if (router.pathname !== "/") {
          bd.style.backgroundColor = "white";
        } else {
          bd.style.backgroundColor = "#ff93c6";
        }
      }
    }
  };

  changeBodyColor();

  return <Component {...pageProps} />;
}

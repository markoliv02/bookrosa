import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div className={router.pathname !== "/" ? "bg-white" : ""}>
      <Component {...pageProps} />;
    </div>
  );
}

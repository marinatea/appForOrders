// pages/_app.tsx
import { AppProps } from "next/app";
import { UserProvider } from "../context/UserContext";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;

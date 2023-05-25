import '@/styles/globals.css'
import { GlobalProvider } from "@/context/global";


export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </>
  );
}

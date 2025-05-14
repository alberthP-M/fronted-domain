import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    // agregamos compatibilidad con el modo dark
    <ThemeProvider enableSystem={true} attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

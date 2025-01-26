import "./globals.css";
import Provider from "@/util/Providers";
import { ColorModeScript } from "@chakra-ui/react"; // Importação necessária para sincronizar o tema
import theme from "@/util/theme";
import Header from "@/components/Header/Header";

export const metadata = {
  title: "Jocas Task",
  description: "Jocas Task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
      </head>
      <body>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}

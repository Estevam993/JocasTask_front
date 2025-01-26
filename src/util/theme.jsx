'use client'

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light", // Define o modo inicial como claro
    useSystemColorMode: false, // Altere para true se quiser seguir o sistema operacional
  },
});

export default theme;

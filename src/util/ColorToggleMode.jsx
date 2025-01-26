"use client";

import { Button, useColorMode } from "@chakra-ui/react";
import { IconMoonStars, IconSunset2Filled } from "@tabler/icons-react";

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} variant={'ghost'}>
      {colorMode === "light" ? <IconMoonStars /> : <IconSunset2Filled />}
    </Button>
  );
}

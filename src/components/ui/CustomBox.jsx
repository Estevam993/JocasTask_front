"use client";
import { Stack } from "@chakra-ui/react";

export default function CustomBox({ children, ...props}) {
  return (
    <Stack
      direction={"row"}
      padding={4}
      shadow={"md"}
      h="calc(100vh - 50px)"
      style={{flex: '1 0 auto'}}
      {...props}
    >
        {children}
    </Stack>
  );
}

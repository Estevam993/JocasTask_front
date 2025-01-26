"use client";
import { Button, Stack, Text } from "@chakra-ui/react";
import Menu from "@/components/Menu/Menu";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const mainRedirect = () => router.push("/");
  return (
    <Stack
      h="50px"
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={4}
      shadow={"md"}
    >
      <Menu />
      <Button variant={"unstyled"} onClick={mainRedirect}>
        <Text fontSize={"2xl"}>Jocas Task</Text>
      </Button>
    </Stack>
  );
}

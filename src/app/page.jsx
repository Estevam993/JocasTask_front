"use client";
import { Button, Center, Divider, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  const registerRedirect = () => {
    router.push("/register");
  };
  const registerLogin = () => {
    router.push("/login");
  };

  return (
    <Center h="calc(100vh - 50px)">
      <Stack>
        <Text fontSize={"4xl"}>Bem Vindo!</Text>
        <Divider />
        <Stack direction={"row"}>
          <Button variant={"ghost"} onClick={registerRedirect}>
            Registrar
          </Button>
          <Button colorScheme="blue" onClick={registerLogin} >Login</Button>
        </Stack>
      </Stack>
    </Center>
  );
}

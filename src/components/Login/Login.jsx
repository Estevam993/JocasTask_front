"use client";
import { Center } from "@chakra-ui/react";
import Form from "../Form/Form";
import { useLoginRequest } from "@/hooks";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { setCookie } from "@/util/http";

export default function Login() {
  const { request } = useLoginRequest();
  const toast = useToast();
  const router = useRouter();

  const loginRequest = async (params) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await request(`${apiUrl}auth/login`, params);

      toast({
        description: "Logado com sucesso.",
        status: "success",
        variant: "left-accent",
      });

      await setCookie("jwt", response.access_token);
      await setCookie("id", response.id);

      router.push("/frames");
    } catch (err) {
      toast({
        description: "Credenciais inválidas.",
        status: "error",
        variant: "left-accent",
      });
    }
  };

  return (
    <Center h="calc(100vh - 50px)">
      <Form
        title="Login"
        fields={[
          { field: "email", label: "E-mail", type: "email" },
          { field: "password", label: "Senha", type: "password" },
        ]}
        buttons={[
          {
            label: "Não tenho conta",
            variant: "ghost",
            onClick: (_) => router.push("/register"),
          },
          {
            label: "Entrar",
            color: "blue",
            onClick: (formValues) => {
              loginRequest(formValues);
            },
          },
        ]}
      />
    </Center>
  );
}

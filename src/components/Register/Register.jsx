import { Center } from "@chakra-ui/react";
import Form from "../Form/Form";
import { usePostData } from "@/hooks";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Register() {
  const { request } = usePostData();
  const toast = useToast();
  const router = useRouter();

  const registerRequest = async (params) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await request(`${apiUrl}user`, params);

      if (response.status == "error") {
        toast({
          description: response.message,
          status: "error",
          variant: "left-accent",
        });
        return;
      }

      toast({
        description: response.message,
        status: "success",
        variant: "left-accent",
      });

      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Center h="calc(100vh - 50px)">
      <Form
        title="Registro"
        fields={[
          { field: "name", label: "Nome", type: "text" },
          { field: "email", label: "E-mail", type: "email" },
          { field: "password", label: "Senha", type: "password" },
        ]}
        buttons={[
          {
            label: "Já tenho conta",
            variant: "ghost",
            onClick: (_) => router.push("/login"),
          },
          {
            label: "Registrar",
            color: "blue",
            onClick: (formValues) => {
              registerRequest(formValues);
            },
          },
        ]}
      />
    </Center>
  );
}

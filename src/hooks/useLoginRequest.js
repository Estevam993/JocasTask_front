import { postRequest } from "@/util/http";
import { useMutation } from "@tanstack/react-query";

const useLoginRequest = () => {
  const mutation = useMutation({
    mutationFn: async ({ url, params }) => {
      const data = await postRequest({
        url: url,
        params: params,
      });

      return data;
    },
  });

  return {
    ...mutation,
    request: (url, params) => mutation.mutateAsync({ url, params }),
  };
};

export default useLoginRequest
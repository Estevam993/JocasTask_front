import { getCookie, getRequest, postRequest } from "@/util/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const useFrames = () => {
  const [userId, setUserId] = useState(null);
  const [jwt, setJwt] = useState(null);
  const queryClient = useQueryClient(); // Pegando o queryClient

  useEffect(() => {
    const handleUserId = async () => {
      const userId = await getCookie("id");
      const jwt = await getCookie("jwt");
      setUserId(userId);
      setJwt(jwt);
    };
    handleUserId();
  }, []);

  const getFramesByUserId = () => {
    const { data, status, error } = useQuery({
      queryKey: ["frames"],
      queryFn: () =>
        getRequest({
          url: `${apiUrl}frames/user/${userId}`,
          headers: { Authorization: jwt },
        }),
      enabled: !!userId && !!jwt,
    });

    return { data, status, error };
  };

  const createFrame = () => {
    const newFrame = useMutation({
      mutationFn: async ({ params }) => {
        const data = await postRequest({
          url: `${apiUrl}frames`,
          params: params,
          headers: { Authorization: jwt },
        });

        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["frames"]);
      },
    });

    return {
      ...newFrame,
      create: (params) => newFrame.mutateAsync({ params }),
    };
  };

  return [getFramesByUserId, createFrame];
};

export default useFrames;

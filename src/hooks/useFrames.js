import { getCookie, getRequest, postRequest } from "@/util/http";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const useFrames = () => {
  const getFramesByUserId = () => {
    const [userId, setUserId] = useState(null);
    const [jwt, setJwt] = useState(null);

    useEffect(() => {
      const handleUserId = async () => {
        const userId = await getCookie("id");
        const jwt = await getCookie("jwt");
        setUserId(userId);
        setJwt(jwt);
      };
      handleUserId();
    }, []);

    const { data, status, error } = useQuery({
      queryKey: ["frames"],
      queryFn: () =>
        getRequest({
          url: `${apiUrl}frames/user/${userId}`,
          headers: { Authorization: jwt },
        }),
    });

    return { data, status, error };
  };

  return [getFramesByUserId];
};

export default useFrames;

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useGetAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const localToken = localStorage.getItem("authToken");
    if (localToken) {
      setToken(localToken);
    } else {
      const authToken = searchParams.get("authToken");
      if (authToken) {
        localStorage.setItem("authToken", authToken);
        setToken(authToken);
      }
    }
  }, [searchParams]);

  return token;
};

export default useGetAuthToken;

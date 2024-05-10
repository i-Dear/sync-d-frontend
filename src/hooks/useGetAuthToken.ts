import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useGetAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const localToken = localStorage.getItem("authToken");
    if (localToken) {
      setToken(localToken);
      router.replace(pathname);
    } else {
      const authToken = searchParams.get("authToken");
      if (authToken) {
        localStorage.setItem("authToken", authToken);
        router.replace(pathname);
        setToken(authToken);
      }
    }
  }, [searchParams]);

  return token;
};

export default useGetAuthToken;

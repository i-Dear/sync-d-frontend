import { useEffect } from "react";

const useAuth = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        // 토큰 기반 인증 처리 로직
      } else {
        // 로그인 페이지로 이동
        window.location.href = "/login";
      }
    }
  });
};

export default useAuth;

"use client";

import useUserInfoStore from "@/store/useUserInfoStore";

const useLogout = () => {
  const { setUserInfo, setProjectsInfo } = useUserInfoStore();

  const logout = () => {
    window.location.href = "/login";
    localStorage.removeItem("token");
    setUserInfo({ id: "", name: "", avatar: "", email: "" });
    setProjectsInfo([]);
  };

  return logout;
};

export default useLogout;

"use client";

import useUserInfoStore from "@/hooks/useUserInfoStore";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = e.currentTarget.querySelector("input");
    if (!input) {
      return;
    }

    const userId = input.value;
    if (!userId) {
      return;
    }

    // 로그인 처리
    const response = await fetch(`/api/mock-auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error("로그인에 실패했습니다.");
    }

    const userInfo = await response.json();
    useUserInfoStore.setState({
      _id: userInfo._id,
      name: userInfo.name,
      color: userInfo.color,
      hostingRooms: userInfo.hostingRooms,
      joinedRooms: userInfo.joinedRooms,
      token: userInfo.token,
    });

    window.localStorage.setItem("token", userInfo.token);
    router.push(`/dashboard/${userInfo._id}`);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Id를 입력해주세요." />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

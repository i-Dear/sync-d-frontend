"use client";

import useUserInfoStore from "@/hooks/useUserInfoStore";
import Image from "next/image";
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
      hostingRooms: userInfo.hostingRooms,
      joinedRooms: userInfo.joinedRooms,
      token: userInfo.token,
    });

    window.localStorage.setItem("token", userInfo.token);
    router.push(`/${userInfo._id}/dashboard`);
  };

  const handleGoogleLogin = () => {
    return (window.location.href =
      "https://syncd-backend.i-dear.org/v1/auth/login/google");
  };

  return (
    <div className="absolute flex h-screen w-screen flex-col items-center justify-center gap-[2.4rem]">
      <Image
        src="/login-logo.svg"
        alt="Login Logo"
        width={200}
        height={215}
        quality={100}
      />
      <h2 className="text-[3.2rem] font-extrabold leading-[3.2rem] text-div-text">
        Welcome Back 🎉
      </h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-[2.4rem]">
        <input
          className="h-[5.6rem] w-[48rem] rounded-[1.2rem] border-[1px] border-light-gray-100  pl-[1.6rem] text-[1.6rem] leading-[1.6rem] text-div-text focus:border-primary focus:outline-none"
          type="text"
          placeholder="Id를 입력해주세요."
        />
        <button
          className=" flex h-[5.2rem] w-[48rem] cursor-pointer items-center justify-center rounded-full bg-primary font-bold leading-[5.2rem] text-white"
          type="submit"
        >
          Login
        </button>
      </form>
      <div
        onClick={handleGoogleLogin}
        className="flex h-[5.2rem] w-[48rem] cursor-pointer items-center justify-center rounded-full bg-light-gray-100"
      >
        <Image
          src="/google-logo.svg"
          alt="Google Logo"
          width={24}
          height={24}
        />
        <span className="ml-[1rem] text-[1.6rem] font-bold text-div-text">
          Sign in with Google
        </span>
      </div>
    </div>
  );
};

export default LoginPage;

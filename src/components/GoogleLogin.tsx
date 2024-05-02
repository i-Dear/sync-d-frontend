"use client";

import Image from "next/image";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    return (window.location.href =
      "https://syncd-backend.i-dear.org/v1/auth/login/google");
  };

  const handleGetRequest = async () => {
    try {
      const result = await fetch("https://syncd-backend.i-dear.org/v1/room", {
        method: "GET",
      });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-4">
      <div
        onClick={handleGoogleLogin}
        className="flex h-[5.2rem] w-[48rem] cursor-pointer items-center justify-center rounded-full bg-white"
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
      <button
        className="h-[5.2rem] w-[5.2rem] rounded-full bg-white"
        onClick={handleGetRequest}
      >
        겟
      </button>
    </div>
  );
};

export default GoogleLoginButton;

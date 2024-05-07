"use client";

import Image from "next/image";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href =
      "https://syncd-backend.dev.i-dear.org/v1/auth/login/google";
  };

  return (
    <div
      onClick={handleGoogleLogin}
      className="flex h-[5.2rem] w-[48rem] cursor-pointer items-center justify-center rounded-full bg-white"
    >
      <Image src="/google-logo.svg" alt="Google Logo" width={24} height={24} />
      <span className="ml-[1rem] text-[1.6rem] font-bold text-div-text">
        Sign in with Google
      </span>
    </div>
  );
};

export default GoogleLoginButton;

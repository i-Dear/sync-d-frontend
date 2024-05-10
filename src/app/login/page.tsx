import GoogleLoginButton from "@/components/GoogleLoginButton";
import Image from "next/image";

const LoginPage = () => {
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

      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;

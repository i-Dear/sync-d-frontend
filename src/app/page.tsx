import GoogleLoginButton from "@/components/GoogleLoginButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen w-screen bg-gradient-blue-white">
      <div className="absolute left-0 top-[5rem]">
        <Image
          src="/landing-logo.svg"
          alt="Landing Logo"
          width={600}
          height={680}
          quality={100}
        />
      </div>
      <div className="absolute right-0 flex h-screen w-[50%] flex-col items-start justify-center gap-[2.4rem]">
        <h1 className="text-[7.2rem] font-extrabold leading-[7.2rem] text-white">
          Sync-D
        </h1>
        <h2 className="w-[66rem] text-[4.8rem] font-bold leading-[6rem] tracking-[-1.58px] text-white">
          Gather everyone&apos;s intelligence and come up with a great idea!
        </h2>
        <p className="w-[60rem] text-2xl font-extralight text-white">
          Sync-D is a real-time thinking collaboration platform that enables
          effective application of design thinking problem-solving methodology
          to idea development. You can easily recognize, define, derive ideas,
          and even prototype problem situations.
        </p>
        <GoogleLoginButton />
      </div>
      <div className="absolute bottom-0 flex h-[5.6rem] w-full items-center justify-center">
        <span className="text-lg font-extralight text-light-gray-100">
          © 2023 i-dear All rights reserved. syncd.official@gmail.com
        </span>
      </div>
    </div>
  );
}

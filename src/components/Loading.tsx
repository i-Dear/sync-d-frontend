import Image from "next/image";

export const Loading = () => {
  return (
    <div className="absolute w-screen h-screen flex place-content-center place-items-center bg-surface-canvas">
      <Image
        className="opacity-20"
        src="https://liveblocks.io/loading.svg"
        alt="Loading"
        width={64}
        height={64}
        priority
      />
    </div>
  );
};

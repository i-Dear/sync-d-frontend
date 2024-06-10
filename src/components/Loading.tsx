import Image from "next/image";

export const Loading = () => {
  return (
    <div className="absolute z-10 flex h-full w-full place-content-center place-items-center bg-surface-canvas">
      <Image
        className="z-20 opacity-20"
        src="https://liveblocks.io/loading.svg"
        alt="Loading"
        width={64}
        height={64}
        priority
      />
    </div>
  );
};

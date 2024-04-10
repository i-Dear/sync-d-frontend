import Link from "next/link";
import { steps } from "@/lib/data";
import type { UserInfoStoreType } from "@/hooks/useUserInfoStore";
import { SetStateAction } from "react";
import { Camera } from "@/lib/types";

const ProcessSideNav = ({
  userInfo,
  setCamera,
}: {
  userInfo: UserInfoStoreType;
  setCamera: React.Dispatch<SetStateAction<Camera>>;
}) => {
  return (
    <nav className="absolute left-0 h-full w-10 bg-gray-900 z-10 overflow-y-scroll scrollbar-hide">
      <ul className="flex flex-col items-center justify-center ">
        <li className="p-4 text-white">
          <Link href="/">홈</Link>
        </li>
        <li className="p-4 text-white">
          <Link href={`/dashboard/${userInfo._id}`}>대시보드</Link>
        </li>
        {steps.map((step) => (
          <li key={step.step} className="p-4 text-white">
            <div
              onClick={() =>
                setCamera(() => ({
                  x: step.camera.x,
                  y: step.camera.y,
                }))
              }
            >
              {step.step}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProcessSideNav;

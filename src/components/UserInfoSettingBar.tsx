import useLogout from "@/hooks/useLogout";
import { MenuType, UserInfo } from "@/lib/types";
import Image from "next/image";
import EditIcon from "~/public/edit.svg";
import LogoutIcon from "~/public/logout.svg";
import SettingsIcon from "~/public/settings.svg";
import useModalStore from "@/store/useModalStore";

const UserInfoSettingBar = ({ userInfo }: { userInfo: UserInfo }) => {
  const { setModalType, setModalState } = useModalStore();
  const Menus: MenuType[] = [
    {
      title: "Setting",
      icon: SettingsIcon,
      onClick: () => {
        setModalType("userInfo");
        setModalState(true);
      },
    },
    {
      title: "Logout",
      icon: LogoutIcon,
      onClick: useLogout(),
    },
  ];

  return (
    <div className=" absolute left-[1.2rem] top-[7.6rem] flex h-fit w-[33.2rem] flex-col items-start justify-start rounded-[1.2rem] bg-white p-[1.6rem] shadow-md shadow-light-gray-100 ">
      <div className="relative flex  w-full flex-col items-center justify-center gap-[1rem] border-b-[1px] border-light-gray-100 pb-[2.4rem] pt-[1.2rem]">
        <div className="relative h-[5.2rem] w-[5.2rem]">
          <Image
            src={userInfo.avatar}
            alt="avatar"
            width={52}
            height={52}
            className="rounded-full"
          />
          <div className="absolute bottom-0 right-0 flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-gray-800">
            <EditIcon />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-[1.6rem] font-normal text-div-text">
            {userInfo.name}
          </span>
          <span className="text-[1.4rem] font-light text-gray-800">
            {userInfo.email}
          </span>
        </div>
      </div>
      <div className="mt-[1.2rem] flex h-fit w-full flex-col">
        {Menus.map((menu) => (
          <div
            key={menu.title}
            className="flex w-full cursor-pointer items-center justify-start gap-[1.6rem] px-[1.2rem] py-[1.6rem]"
            onClick={menu.onClick}
          >
            <menu.icon />
            <span className="text-[1.4rem] font-normal text-div-text">
              {menu.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfoSettingBar;

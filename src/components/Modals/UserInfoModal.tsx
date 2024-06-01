"use client";

import { cn } from "@/lib/utils";
import { ChangeEvent, useState } from "react";
import { set, useForm } from "react-hook-form";
import useModalStore from "@/store/useModalStore";
import useUserInfoStore from "@/store/useUserInfoStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EditIcon from "~/public/edit.svg";

const UserInfoModal = () => {
  const { userInfo } = useUserInfoStore();
  const [userName, setUserName] = useState<string>(userInfo.name);
  const [contentImage, setContentImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setModalState } = useModalStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrl, setContentImageUrl] = useState<string | null>(null);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };

  const readImage = (image: File) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      setContentImageUrl(String(e.target?.result));
    };
    reader.readAsDataURL(image);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setContentImage(e.dataTransfer.files[0]);
    readImage(e.dataTransfer.files[0]);
    setIsDragging(false);
  };

  const onContentImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setContentImage(e.target.files[0]);
      readImage(e.target.files[0]);
    }
  };

  const onSubmit = async () => {
    try {
      if (userName.length < 2) {
        alert("이름을 입력하세요");
        return;
      }
      setModalState(false);
      console.log("updateUser");
      const formData = new FormData();
      formData.append("name", userName);
      contentImage && formData.append("avatar", contentImage);
      await fetch("https://syncd-backend.dev.i-dear.org/v1/updateUserInfo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });
      reset();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form
      className="flex h-[70rem] max-h-screen w-[56.5rem] flex-col items-start justify-start overflow-y-scroll rounded-[2rem] bg-white px-[4.45rem] py-[3.2rem] shadow-2xl scrollbar-hide"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-[2.4rem] font-bold text-div-text">User Info</h1>
      <div className="mt-[1.6rem] flex w-full flex-col gap-[0.8rem]">
        <div className="flex w-full justify-center ">
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            id="input-file"
            className="hidden"
            aria-hidden
            onChange={onContentImageChange}
          />
          <div
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
            className={cn(
              "border-1 flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full border-dashed border-gray-300 ",
              {
                "bg-gray-100": isDragging,
              },
            )}
          >
            {userInfo.avatar ? null : (
              <>
                <h3 className="text-[1.8rem] font-bold text-div-text">Image</h3>
                <span className="text-[1.4rem] font-light text-div-text">
                  Draw or upload your project&apos;s thumbnail
                </span>
                <label
                  htmlFor="input-file"
                  role="button"
                  className="mt-[1.6rem] flex h-[4rem] w-[10rem] items-center justify-center rounded-[1.2rem] bg-light-gray-100 text-[1.4rem] font-bold"
                >
                  Upload file
                </label>
              </>
            )}
            {userInfo.avatar && (
              <div className="relative flex items-center justify-center">
                <Image
                  src={userInfo.avatar}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <label
                  htmlFor="input-file"
                  role="button"
                  className="absolute bottom-0 right-0 flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-gray-800"
                >
                  <EditIcon />
                </label>
              </div>
            )}
          </div>
        </div>
        <span className="text-start text-[1.6rem] font-semibold text-div-text">
          Name
        </span>
        <div className="flex w-full items-center gap-[1.6rem]">
          <input
            type="text"
            className="text-light h-[4.8rem] w-full rounded-[1.2rem] bg-light-gray-100 px-[1.6rem]"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="font-base flex justify-center text-red-500">
          {errorMessage}
        </div>
      </div>

      <button
        type="submit"
        className="mt-[1.6rem] flex h-[4.8rem] w-full items-center justify-center rounded-[1.2rem] bg-primary py-[1.6rem] text-white"
      >
        Save
      </button>
    </form>
  );
};

export default UserInfoModal;

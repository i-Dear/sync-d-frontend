"use client";

import ImageInputBox from "@/components/ImageInputBox";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import XMarkIcon from "~/public/x-mark.svg";
import useModalStore from "@/store/useModalStore";
import { useRouter } from "next/navigation";

const CreateProjectModal = () => {
  const [contentImage, setContentImage] = useState<File | null>(null);
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const { setModalState } = useModalStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleInvite = () => {
    if (inviteEmail.length > 0) {
      setInviteEmails([...inviteEmails, inviteEmail]);
      setInviteEmail("");
    }
  };

  const revalidateUserInfo = async () => {
    await fetch("/api/revalidate?tag=userInfo", {
      method: "POST",
    });

    router.refresh();
  };

  const onSubmit = async (data: any) => {
    try {
      setModalState(false);
      const formData = new FormData();
      formData.append("name", data.projectName);
      formData.append("description", data.projectDescription);
      //formData.append("img", data.img); // 이미지 우선 제외
      inviteEmails.forEach((email: string) => {
        formData.append("userEmails", email);
      });

      await fetch("https://syncd-backend.dev.i-dear.org/v1/project/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });
      revalidateUserInfo();
      reset();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleInvite();
    }
  };

  return (
    <form
      className="flex h-[70rem] w-[56.5rem] flex-col items-start justify-start overflow-y-scroll rounded-[2rem] bg-white px-[4.45rem] py-[3.2rem] shadow-2xl scrollbar-hide"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-[2.4rem] font-bold text-div-text">Create Project</h1>
      <label className="mt-[1.6rem] flex w-full flex-col gap-[0.8rem]">
        <span className="text-start text-[1.6rem] font-semibold text-div-text">
          Project Name
        </span>
        <input
          type="text"
          {...register("projectName", { required: true })}
          className="text-light h-[4.8rem] w-full rounded-[1.2rem] bg-light-gray-100 px-[1.6rem]"
          placeholder="Project Name"
        />
        {errors.projectName && (
          <span className="text-red-600">This field is required</span>
        )}
        <span className="mt-[0.4rem] text-start text-[1.2rem] text-gray-800">
          A great name makes your project stand out
        </span>
      </label>
      <label className="mb-[1.6rem] mt-[1.6rem] flex w-full flex-col gap-[0.8rem]">
        <span className="text-start text-[1.6rem] font-semibold text-div-text">
          Project Description
        </span>
        <textarea
          {...register("projectDescription", { required: true })}
          className="text-light h-[12rem] w-full rounded-[1.2rem] bg-light-gray-100 px-[1.6rem] py-[1.2rem]"
          placeholder="Project Description"
        />
        {errors.projectDescription && (
          <span className="text-red-600">This field is required</span>
        )}
        <span className="mt-[0.4rem] text-start text-[1.2rem] text-gray-800">
          Describe your project in a few words
        </span>
      </label>
      <ImageInputBox
        ImageState={{
          contentImage: contentImage,
          setContentImage: setContentImage,
        }}
      />
      <div className="mt-[1.6rem] flex w-full flex-col gap-[0.8rem]">
        <span className="text-start text-[1.6rem] font-semibold text-div-text">
          Collaborators
        </span>
        <div className="flex w-full items-center gap-[1.6rem]">
          <input
            type="text"
            className="text-light h-[4.8rem] w-[38.4rem] rounded-[1.2rem] bg-light-gray-100 px-[1.6rem]"
            placeholder="Email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            className={cn(
              "flex h-[4.8rem] w-[8.4rem] items-center justify-center rounded-[1.2rem] bg-primary-300 text-white",
              {
                "cursor-pointer bg-primary": inviteEmail.length > 0,
                "cursor-not-allowed": inviteEmail.length === 0,
              },
            )}
            onClick={handleInvite}
          >
            Invite
          </button>
        </div>
        <span className="mt-[0.4rem] text-start text-[1.2rem] text-gray-800">
          Invite your team members by email
        </span>
        {inviteEmails.length > 0 && (
          <div className="mt-[1.6rem] flex w-full flex-col gap-[0.8rem]">
            <span className="text-start text-[1.6rem] font-semibold text-div-text">
              Invited Collaborators
            </span>
            {inviteEmails.map((email) => (
              <div
                key={email}
                className="flex h-[4.8rem] w-full items-center justify-between gap-[1.6rem] rounded-[1.2rem] bg-light-gray-100 px-[1.6rem]"
              >
                <span className="text-start text-gray-800">{email}</span>
                <div
                  onClick={() =>
                    setInviteEmails(inviteEmails.filter((e) => e !== email))
                  }
                  className="flex h-[2.4rem] w-[2.4rem] cursor-pointer items-center justify-center"
                >
                  <XMarkIcon />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="mt-[1.6rem] flex h-[4.8rem] w-full items-center justify-center rounded-[1.2rem] bg-primary py-[1.6rem] text-white"
      >
        Create Project
      </button>
    </form>
  );
};

export default CreateProjectModal;

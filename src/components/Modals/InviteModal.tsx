"use client";

import ImageInputBox from "@/components/ImageInputBox";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import XMarkIcon from "~/public/x-mark.svg";
import useModalStore from "@/store/useModalStore";
import { useRouter } from "next/navigation";
import { useRoom } from "~/liveblocks.config";

const InviteModal = () => {
  const [contentImage, setContentImage] = useState<File | null>(null);
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setModalState } = useModalStore();
  const router = useRouter();
  const { id } = useRoom();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInvite = () => {
    if (inviteEmail.length > 0 && isValidEmail(inviteEmail)) {
      setInviteEmails([...inviteEmails, inviteEmail]);
      setInviteEmail("");
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid email address.");
    }
  };

  const onSubmit = async () => {
    try {
      setModalState(false);

      await fetch("https://syncd-backend.dev.i-dear.org/v1/project/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          projectId: id,
          users: inviteEmails,
        }),
      });
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
      className={`flex h-[${30 + inviteEmails.length * 7}rem] max-h-screen w-[56.5rem] flex-col items-start justify-start overflow-y-scroll rounded-[2rem] bg-white px-[4.45rem] py-[3.2rem] shadow-2xl scrollbar-hide`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-[2.4rem] font-bold text-div-text">Invite</h1>
      <span className="text-start text-[1.6rem] font-semibold text-div-text">
        Project Name
      </span>
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
        <div className="font-base flex justify-center text-red-500">
          {errorMessage}
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
        Invite
      </button>
    </form>
  );
};

export default InviteModal;

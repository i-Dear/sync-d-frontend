"use client";

import useUserInfoStore from "@/store/useUserInfoStore";
import SendBirdCall from "sendbird-calls";
import { ActiveUserInfo, useMutation } from "~/liveblocks.config";
import { useSendBirdInit } from "@/hooks/useSendBirdCall";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TypeGroupCallId {
  roomId: string;
}

const GroupCallButton = (groupCallId: TypeGroupCallId) => {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isCalling, setIsCalling] = useState(false);

  const roomParams = {
    roomType: SendBirdCall.RoomType.LARGE_ROOM_FOR_AUDIO_ONLY,
  };

  const enterParams = {
    videoEnabled: false, // 비디오 미사용
    audioEnabled: true, // 오디오만 출력
  };

  const updateRoomId = useMutation(({ storage }, roomId: string) => {
    const groupCallId = storage.get("groupCall");
    groupCallId.set("roomId", roomId);
  }, []);

  const addToActiveUsers = useMutation(({ storage }, user: ActiveUserInfo) => {
    const groupCallActiveUsers = storage.get("groupCall").get("activeUsers");
    groupCallActiveUsers.push(user);
  }, []);

  const exitFromActiveUsers = useMutation(({ storage }) => {
    const groupCallActiveUsers = storage.get("groupCall").get("activeUsers");

    groupCallActiveUsers.delete(
      groupCallActiveUsers.findIndex(
        (user: ActiveUserInfo) => user.id === userInfo.id,
      ),
    );
  }, []);

  const authToken = localStorage.getItem("authToken");
  const authOption = { userId: userInfo.id, accessToken: authToken! }; // Authentication options using user information
  useSendBirdInit(authOption);

  const joinGroupCall = async () => {
    // 아직 프로젝트 내에 그룹 콜이 진행되지 않은 경우, 새로운 방 생성
    if (!groupCallId.roomId) {
      SendBirdCall.createRoom(roomParams).then((room) => {
        updateRoomId(room.roomId); // 프로젝트 내 그룹 콜 ID 설정
      });
    }

    SendBirdCall.fetchRoomById(groupCallId.roomId).then((room) => {
      if (
        room.participants.filter(
          (participant) => participant.user.userId === userInfo.id,
        ).length > 0
      ) {
        console.log("이미 참여한 방입니다.");
        return;
      } else {
        room
          .enter(enterParams)
          .then(() => {
            if (!audioRef.current) return;

            room.setAudioForLargeRoom(audioRef.current); // 오디오 설정
            audioRef.current!.muted = false; // 음소거 설정

            setIsCalling(true);
            addToActiveUsers({
              name: userInfo.name,
              id: userInfo.id,
              avatar: userInfo.avatar,
              email: userInfo.email,
              enteredAt: Date.now(),
            });
          })
          .catch((error) => {
            console.error("입장 실패: ", error);
          });

        room.addEventListener("remoteParticipantEntered", (participant) => {
          console.log("다른 참가자가 입장했습니다. 참가자:", participant);
        });
      }
    });
  };

  const exitGroupCall = useCallback(() => {
    const room = SendBirdCall.getCachedRoomById(groupCallId.roomId);
    try {
      if (!room) {
        console.log("방이 존재하지 않습니다.");
        return;
      }
      room.exit();
      setIsCalling(false);
      exitFromActiveUsers();
    } catch (error) {
      console.log("방에 참여하지 않은 상태입니다.");
    }
  }, [groupCallId.roomId, exitFromActiveUsers]);

  useEffect(() => {
    window.addEventListener("beforeunload", exitGroupCall);
    return () => {
      window.removeEventListener("beforeunload", exitGroupCall);
    };
  }, [exitGroupCall]);

  return (
    <div className="flex w-full items-center justify-center gap-2 text-[12px] font-normal">
      <audio ref={audioRef} autoPlay />
      <div
        className={cn(
          "w-[270px] cursor-pointer rounded-2xl p-2 text-center text-white",
          isCalling ? "bg-red-400" : "bg-primary",
        )}
        onClick={isCalling ? exitGroupCall : joinGroupCall}
      >
        {isCalling ? "나가기" : "입장"}
      </div>
    </div>
  );
};

export default GroupCallButton;

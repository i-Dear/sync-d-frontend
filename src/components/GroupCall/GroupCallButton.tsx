"use client";

import useUserInfoStore from "@/hooks/useUserInfoStore";
import SendBirdCall from "sendbird-calls";
import { ActiveUserInfo, useMutation } from "~/liveblocks.config";
import { useSendBirdInit } from "@/hooks/useSendBirdCall";
import { useRef } from "react";

interface TypeGroupCallId {
  roomId: string;
}

const GroupCallButton = (groupCallId: TypeGroupCallId) => {
  const userInfo = useUserInfoStore();
  const audioRef = useRef<HTMLAudioElement>(null);

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
        (user: ActiveUserInfo) => user.userId === userInfo._id
      )
    );
  }, []);

  const authOption = { userId: userInfo._id, accessToken: userInfo.token }; // Authentication options using user information
  useSendBirdInit(authOption);

  const joinGroupCall = async () => {
    // 아직 프로젝트 내에 그룹 콜이 진행되지 않은 경우, 새로운 방 생성
    if (!groupCallId.roomId) {
      SendBirdCall.createRoom(roomParams).then((room) => {
        updateRoomId(room.roomId); // 프로젝트 내 그룹 콜 ID 설정
        console.log("방 생성 성공, roomId: ", room.roomId);
      });
    }

    SendBirdCall.fetchRoomById(groupCallId.roomId).then((room) => {
      console.log("방 불러오기 성공: ", room);

      if (
        room.participants.filter(
          (participant) => participant.user.userId === userInfo._id
        ).length > 0
      ) {
        console.log("이미 참여한 방입니다.");
        return;
      } else {
        room
          .enter(enterParams)
          .then(() => {
            console.log("입장 성공: ");
            if (!audioRef.current) return;

            room.setAudioForLargeRoom(audioRef.current); // 오디오 설정
            audioRef.current!.volume = 0.5; // 볼륨 설정
            audioRef.current!.muted = false; // 음소거 설정

            addToActiveUsers({
              name: userInfo.name,
              userId: userInfo._id,
              enteredAt: Date.now(),
            });
          })
          .catch((error) => {
            console.error("입장 실패: ", error);
          });

        room.addEventListener("remoteParticipantEntered", (participant) => {
          console.log("다른 참가자가 입장했습니다. 참가자:", participant);
        });

        room.addEventListener("remoteAudioSettingsChanged", (participant) => {
          console.log(
            "참가자의 오디오 설정이 변경되었습니다. 참가자:",
            participant
          );
        });
      }
    });
  };

  const exitGroupCall = () => {
    const room = SendBirdCall.getCachedRoomById(groupCallId.roomId);
    try {
      if (!room) {
        console.log("방이 존재하지 않습니다.");
        return;
      }
      room.exit();
      exitFromActiveUsers();
    } catch (error) {
      console.log("방에 참여하지 않은 상태입니다.");
    }
  };

  window.addEventListener("beforeunload", exitGroupCall);

  return (
    <div className="flex gap-2">
      <audio ref={audioRef} autoPlay />
      <button
        className="rounded-xl w-36 h-10 bg-purple-400 text-white"
        onClick={joinGroupCall}
      >
        그룹콜 참여
      </button>
      <button
        className="rounded-xl w-36 h-10 bg-purple-400 text-white"
        onClick={exitGroupCall}
      >
        그룹콜 나가기
      </button>
    </div>
  );
};

export default GroupCallButton;

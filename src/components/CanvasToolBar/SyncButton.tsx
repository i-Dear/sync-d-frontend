import { useState } from "react";
import { useStorage, useMutation } from "~/liveblocks.config";
import { useMyPresence } from "~/liveblocks.config";
import { useBroadcastEvent, useEventListener } from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import { Template } from "@/lib/types";
import { useRoom } from "~/liveblocks.config";
import {
  fetchScenario,
  // addEpicTemplate,
  // addUserStoryTemplate,
  addEpicLayer,
  addUserStoryLayer,
} from "@/utils/processSync";
import { Epic } from "@/lib/types";

const SyncButton = () => {
  // Broadcast event hook
  const broadcast = useBroadcastEvent();
  const { setModalType, setModalState } = useModalStore();
  const [myPresence] = useMyPresence();
  const { currentProcess } = myPresence;
  const templates = useStorage((root) => root.templates) as Template[];
  const room = useRoom();

  const handleClick = async () => {
    if (currentProcess === 10) {
      broadcast({ type: "SCENARIO_MODAL_ON", message: "Event received!" });
      setModalType("processingScenario");
      setModalState(true);
      // const epics: void | Epic[] = await fetchScenario(room.id, templates);
      const epics = [
        {
          id: "1",
          name: "냉장고 등록(사용자)",
          userStories: [
            {
              id: 1,
              name: "사용자는 냉장고에 보유한 식재료를 등록할 수 있다.",
            },
            {
              id: 2,
              name: "사용자는 각 식재료의 수량을 등록할 수 있다.",
            },
            {
              id: 3,
              name: "사용자는 냉장고에 등록된 식재료를 수정 또는 삭제할 수 있다.",
            },
          ],
        },
        {
          id: "2",
          name: "요리 추천 기능(사용자)",
          userStories: [
            {
              id: 1,
              name: "사용자는 냉장고에 등록된 식재료를 기반으로 요리 추천을 받을 수 있다.",
            },
            {
              id: 2,
              name: "사용자는 요리 추천 결과를 필터링하거나 정렬할 수 있다.",
            },
            {
              id: 3,
              name: "사용자는 추천된 요리에 대한 상세 정보를 확인할 수 있다.",
            },
          ],
        },
        {
          id: "3",
          name: "레시피 및 재료 데이터베이스 구축(어드민)",
          userStories: [
            {
              id: 1,
              name: "어드민은 레시피 정보와 재료 정보를 데이터베이스에 추가할 수 있다.",
            },
            {
              id: 2,
              name: "어드민은 레시피와 재료 정보를 수정하거나 삭제할 수 있다.",
            },
            {
              id: 3,
              name: "어드민은 데이터베이스에 새로운 레시피와 재료 정보를 업데이트할 수 있다.",
            },
          ],
        },
        {
          id: "4",
          name: "레시피 상세 정보 및 리뷰 확인 기능(사용자)",
          userStories: [
            {
              id: 1,
              name: "사용자는 특정 레시피의 상세 정보를 확인할 수 있다.",
            },
            {
              id: 2,
              name: "사용자는 다른 사용자가 남긴 레시피 리뷰를 확인할 수 있다.",
            },
            {
              id: 3,
              name: "사용자는 레시피에 대한 평가 및 리뷰를 작성할 수 있다.",
            },
            {
              id: 4,
              name: "사용자는 레시피에 대한 평가 및 리뷰를 작성할 수 있다.",
            },
          ],
        },
      ];
      setModalState(false);
      broadcast({
        type: "SCENARIO_MODAL_OFF",
        message: "Event received!",
      });
      updateEpic(epics);
    }
  };

  // const updateEpic = useMutation(({ storage }, epics) => {
  //   //const epics = storage.get("epics");
  //   const templates = storage.get("templates");
  //   epics.map((epic: Epic, epicidx: number) => {
  //     addEpicTemplate(templates, epic, epicidx);
  //     epic.userStories.map((userStory, idx) => {
  //       addUserStoryTemplate(templates, epic, epicidx, userStory, idx);
  //     });
  //   });
  // }, []);
  const updateEpic = useMutation(({ storage }, epics) => {
    //const epics = storage.get("epics");
    const layers = storage.get("layers");
    const liveLayerIds = storage.get("layerIds");
    epics.map((epic: Epic, epicidx: number) => {
      addEpicLayer(layers, epic, epicidx, liveLayerIds);
      // epic.userStories.map((userStory, idx) => {
      //   addUserStoryLayer(layers, epic, epicidx, userStory, idx);
      // });
    });
  }, []);

  useEventListener(({ event }) => {
    if (event.type === "SCENARIO_MODAL_ON") {
      setModalType("processingScenario");
      setModalState(true);
      console.log("helloevent");
    }
    if (event.type === "SCENARIO_MODAL_OFF") {
      setModalState(false);
    }
  });

  // Listen for incoming events

  //api전송로직 10단계 버튼만

  return (
    <button
      className="w-[80px] cursor-pointer  rounded-2xl bg-primary  p-2 text-center text-[18px] text-white"
      onClick={handleClick}
    >
      Sync
    </button>
  );
};

export default SyncButton;

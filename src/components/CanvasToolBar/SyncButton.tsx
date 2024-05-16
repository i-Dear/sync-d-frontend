import { useState } from "react";
import { useStorage, useMutation } from "~/liveblocks.config";
import { useMyPresence } from "~/liveblocks.config";
import { useBroadcastEvent, useEventListener } from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import { Template } from "@/lib/types";
import { useRoom } from "~/liveblocks.config";
import {
  fetchScenario,
  addEpicTemplate,
  addUserStoryTemplate,
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
      const epics: void | Epic[] = await fetchScenario(room.id, templates);
      setModalState(false);
      broadcast({
        type: "SCENARIO_MODAL_OFF",
        message: "Event received!",
      });
      updateEpic(epics);
    }
  };

  const updateEpic = useMutation(({ storage }, epics) => {
    //const epics = storage.get("epics");
    const templates = storage.get("templates");
    epics.map((epic: Epic, epidx: number) => {
      addEpicTemplate(templates, epic, epidx);
      epic.userStories.map((userStory, idx) => {
        addUserStoryTemplate(templates, epic, epidx, userStory, idx);
      });
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

import { useState } from "react";
import { useStorage, useMutation } from "~/liveblocks.config";
import { useMyPresence } from "~/liveblocks.config";
import { useBroadcastEvent, useEventListener } from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import useRoomIdStore from "@/store/useRoomIdStore";
import {
  Template,
  TemplateType,
  InputFormBoxTemplate,
  EpicBoxTemplate,
  UserStory,
} from "@/lib/types";
import { fetchScenario } from "@/utils/processSync";
import { Epic } from "@/lib/types";

const SyncButton = () => {
  // Broadcast event hook
  const broadcast = useBroadcastEvent();
  const { setModalType, setModalState } = useModalStore();
  const [myPresence] = useMyPresence();
  const { currentProcess } = myPresence;
  const process = useStorage((root) => root.process);
  const templates = useStorage((root) => root.templates) as Template[];
  const storedEpics = useStorage((root) => root.epics);
  const { roomId } = useRoomIdStore();

  const handleClick = async () => {
    if (currentProcess === 10) {
      broadcast({ type: "SCENARIO_MODAL_ON", message: "Event received!" });
      setModalType("processingScenario");
      setModalState(true);
      const epics: void | Epic[] = await fetchScenario(roomId, templates);
      setModalState(false);
      broadcast({
        type: "SCENARIO_MODAL_OFF",
        message: "Event received!",
      });
      updateEpic(epics);
    }
  };

  const updateEpic = useMutation(({ storage }, epics) => {
    const templates = storage.get("templates");
    // const epics = storage.get("epics");

    const addEpicTemplate = (epic: Epic, idx: number) => {
      templates.push({
        id: `${parseInt(epic.id) + 1100}`,
        type: TemplateType.EpicBox,
        length: epic.userStories.length,
        title: epic.name,
        x:
          idx < 4
            ? 50 + (parseInt(epic.id) - 1) * 400
            : 50 + (parseInt(epic.id) - 5) * 400,
        y: idx < 4 ? 10100 : 10600,
        fill: "#369EFF",
        width: 400,
      });
    };

    const addUserStoryTemplate = (
      epic: Epic,
      epidx: number,
      userStory: UserStory,
      idx: number,
    ) => {
      templates.push({
        id: `${parseInt(epic.id) * 100 + 1100 + userStory.id}`,
        type: TemplateType.EpicBox,
        length: 1,
        title: userStory.name,
        x:
          epidx < 4
            ? 50 + (parseInt(epic.id) - 1) * 400
            : 50 + (parseInt(epic.id) - 5) * 400,
        y: epidx < 4 ? 10100 + userStory.id * 60 : 10600 + userStory.id * 60,
        width: 400,
        height: 50,
        fill: "#A5D0F9",
        font: 8,
      });
    };

    epics.map((epic: Epic, epidx: number) => {
      addEpicTemplate(epic, epidx);
      epic.userStories.map((userStory, idx) => {
        addUserStoryTemplate(epic, epidx, userStory, idx);
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

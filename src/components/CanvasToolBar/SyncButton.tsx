import { useState } from "react";
import { useStorage, useMutation } from "~/liveblocks.config";
import { useMyPresence } from "~/liveblocks.config";
import { useBroadcastEvent, useEventListener } from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import useRoomIdStore from "@/store/useRoomIdStore";
import { Template, TemplateType, InputFormBoxTemplate } from "@/lib/types";
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
      updateLiveStorage(epics);
    }
  };

  const updateLiveStorage = useMutation(({ storage }, epics) => {
    storage.set("epics", epics);
    storage.get("epics").map((v) => console.log(v));
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

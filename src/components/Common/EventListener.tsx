import { useBroadcastEvent, useEventListener } from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";

const EventListener = () => {
  const { setModalType, setModalState } = useModalStore();
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

  return <></>;
};

export default EventListener;

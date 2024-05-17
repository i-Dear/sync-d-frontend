import {
  useBroadcastEvent,
  useEventListener,
  useMutation,
} from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";

const EventListener = () => {
  const initSync = useMutation(({ setMyPresence }) => {
    setMyPresence({ isSynced: false });
  }, []);

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
    if (event.type === "ALL_SYNCED") {
      initSync();
      setModalType("synced");
      setModalState(true);
    }
  });

  return <></>;
};

export default EventListener;

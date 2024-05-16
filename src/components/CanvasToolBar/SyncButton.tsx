import { useEffect, useState } from "react";
import {
  useRoom,
  useStorage,
  useMutation,
  useMyPresence,
  useSelf,
  useOthersMapped,
  useBroadcastEvent,
  useEventListener,
} from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import { Template, Epic, Process } from "@/lib/types";
import {
  fetchScenario,
  addEpicTemplate,
  addUserStoryTemplate,
} from "@/utils/processSync";

const SyncButton = () => {
  const { setModalType, setModalState } = useModalStore();

  // Broadcast event hook
  const broadcast = useBroadcastEvent();
  const { id } = useRoom();
  const [myPresence] = useMyPresence();
  const { currentProcess } = myPresence;
  // const mySyncState = useSelf((self) => self.presence.isSynced);
  const [mySyncState, setMySyncState] = useState(false);
  const [syncCount, setSyncCount] = useState(0);

  const updateMySyncState = useMutation(({ setMyPresence }, value) => {
    setMySyncState(value);
    setMyPresence({ isSynced: value });
  }, []);

  const othersSyncState = useOthersMapped((other) => other.presence.isSynced);
  useEffect(() => {
    const otherSyncList = othersSyncState.filter((other) => {
      if (other[1] === true) {
        return other[0];
      }
    });
    setSyncCount(otherSyncList.length);
  }, [othersSyncState]);
  const totalMembers = othersSyncState.length + 1;

  //완료가 안된 단계 중 가장 앞에있는 단계를 찾는다
  const process = useStorage((root) => root.process);

  const latestUndoneProcess = process.find(
    (process) => !process.done,
  ) as Process;
  const latestUndoneStep = latestUndoneProcess?.step;

  const completeProcess = useMutation(
    ({ storage }) => {
      if (!latestUndoneStep) return;
      const storageProcess = storage.get("process");
      const updatedProcess = {
        ...storageProcess.get(latestUndoneStep - 1),
        done: true,
      } as Process;
      storageProcess.set(latestUndoneStep - 1, updatedProcess);
    },
    [process],
  );

  useEffect(() => {
    setMySyncState(false);
  }, [process]);

  const templates = useStorage((root) => root.templates) as Template[];
  const handleClick = async () => {
    updateMySyncState(true);
    if (syncCount + 1 === totalMembers) {
      broadcast({ type: "ALL_SYNCED", message: "sync Complete!" });
      setModalType("synced");
      setModalState(true);
      completeProcess();
      updateMySyncState(false);
    }

    //10단계에서만 적용되는 시나리오 전송 로직
    if (currentProcess === 10) {
      broadcast({ type: "SCENARIO_MODAL_ON", message: "Event received!" });
      setModalType("processingScenario");
      setModalState(true);
      const epics: void | Epic[] = await fetchScenario(id, templates);
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
    epics.map((epic: Epic, epidx: number) => {
      addEpicTemplate(templates, epic, epidx);
      epic.userStories.map((userStory, idx) => {
        addUserStoryTemplate(templates, epic, epidx, userStory, idx);
      });
    });
  }, []);

  return (
    <div className="relative flex items-center">
      <button
        className="w-[80px] cursor-pointer rounded-2xl bg-primary p-2 text-center text-[18px] text-white"
        onClick={handleClick}
      >
        Sync
      </button>
      <div className="absolute right-[-40px] flex items-center space-x-1">
        {/* 싱크 진행도 */}
        <div
          className={`h-[10px] w-[4px] border ${
            mySyncState
              ? "border-green-500 bg-green-500"
              : "border-gray-300 bg-gray-300"
          }`}
        ></div>
        {Array.from({ length: totalMembers - 1 }, (_, index) => (
          <div
            key={index}
            className={`h-[10px] w-[4px] border ${
              index < syncCount
                ? "border-green-500 bg-green-500"
                : "border-gray-300 bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SyncButton;

"use client";

import { useEffect, useState } from "react";
import {
  useRoom,
  useStorage,
  useMutation,
  useMyPresence,
  useOthersMapped,
  useBroadcastEvent,
  useUpdateMyPresence,
} from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import { Template, Epic, Process } from "@/lib/types";
import { fetchScenario, addEpicLayer } from "@/utils/processSync";
import { updateProgress } from "@/lib/data";
import useGetAuthToken from "@/hooks/useGetAuthToken";

const SyncButton = () => {
  const { setModalType, setModalState } = useModalStore();

  // Broadcast event hook
  const broadcast = useBroadcastEvent();
  const { id } = useRoom();
  const authToken = useGetAuthToken();
  const [myPresence] = useMyPresence();
  const updateMyPresence = useUpdateMyPresence();
  const { currentProcess } = myPresence;
  // const mySyncState = useSelf((self) => self.presence.isSynced);
  const [mySyncState, setMySyncState] = useState(false);
  const [syncCount, setSyncCount] = useState(0);

  const updateMySyncState = (value: boolean) => {
    setMySyncState(value);
    updateMyPresence({ isSynced: value });
  };

  const othersSyncState = useOthersMapped((other) => other.presence.isSynced);
  useEffect(() => {
    const otherSyncList = othersSyncState.filter((other) => {
      if (other[1] === true) {
        return "synced";
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
      if ([7, 9].includes(currentProcess)) {
        updateMySyncState(false);
        broadcast({ type: "ALL_SYNCED", message: "sync Complete!" });
        setModalType("synced");
        setModalState(true);
        completeProcess();
        return;
      }
      if (currentProcess === 10) {
        broadcast({
          type: "SCENARIO_MODAL_ON",
          message: "Event received!",
        });
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
      if (currentProcess === 12) {
        broadcast({
          type: "LAST_PROCESS_COMPLETED",
          message: "THE END!",
        });
        setModalType("complete");
        setModalState(true);
        completeProcess();
        return;
      }
      updateMySyncState(false);
      broadcast({ type: "ALL_SYNCED", message: "sync Complete!" });
      setModalType("synced");
      setModalState(true);
      completeProcess();
      if (authToken) {
        updateProgress(
          authToken,
          id,
          latestUndoneStep,
          "",
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        );
      }
    }
  };

  const updateEpic = useMutation(({ storage }, epics) => {
    const layers = storage.get("layers");
    const liveLayerIds = storage.get("layerIds");
    epics.map((epic: Epic, epicidx: number) => {
      addEpicLayer(layers, epic, epicidx, liveLayerIds);
    });
  }, []);

  return (
    <>
      {currentProcess === latestUndoneStep ? (
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
      ) : null}
    </>
  );
};

export default SyncButton;

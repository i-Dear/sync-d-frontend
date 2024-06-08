import { useMutation, useStorage } from "~/liveblocks.config";
import { Process } from "@/lib/types";
import useSyncedData from "./useSyncedData";
const useCompleteProcess = () => {
  const process = useStorage((root) => root.process);

  const latestUndoneProcess = process.find(
    (process) => !process.done,
  ) as Process;
  const latestUndoneStep = latestUndoneProcess?.step;
  const sendSyncedData = useSyncedData();
  return useMutation(
    ({ storage }) => {
      if (!latestUndoneStep) return;
      const storageProcess = storage.get("process");
      const updatedProcess = {
        ...storageProcess.get(latestUndoneStep - 1),
        done: true,
      } as Process;
      storageProcess.set(latestUndoneStep - 1, updatedProcess);
      console.log("completed process", latestUndoneStep);
      sendSyncedData();
    },
    [process],
  );
};

export default useCompleteProcess;

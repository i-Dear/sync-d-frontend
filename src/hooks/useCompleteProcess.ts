import { useMutation, useStorage } from "~/liveblocks.config";
import { Process } from "@/lib/types";
import useSyncedData from "./useSyncedData";
import useGetAuthToken from "@/hooks/useGetAuthToken";
const useCompleteProcess = (authToken: string) => {
  const process = useStorage((root) => root.process);
  const latestUndoneProcess = process.find(
    (process) => !process.done,
  ) as Process;
  const latestUndoneStep = latestUndoneProcess?.step;
  const sendSyncedData = useSyncedData(authToken);
  return useMutation(
    ({ storage }) => {
      if (!latestUndoneStep) return;
      sendSyncedData();
      const storageProcess = storage.get("process");
      const updatedProcess = {
        ...storageProcess.get(latestUndoneStep - 1),
        done: true,
      } as Process;
      storageProcess.set(latestUndoneStep - 1, updatedProcess);
      console.log("completed process", latestUndoneStep);
    },
    [process],
  );
};

export default useCompleteProcess;

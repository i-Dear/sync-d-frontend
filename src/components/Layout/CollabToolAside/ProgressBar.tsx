import { useStorage } from "~/liveblocks.config";
import { Progress } from "~/src/components/Common/Progress";

const ProgressBar = () => {
  const process = useStorage((root) => root.process);
  const completeList = process.filter((process) => process.done === true);
  const progress = completeList.length;

  return (
    <>
      <div className="font-Manrope">Progress</div>
      <Progress value={(progress / 12) * 100} />
      <div className="text-gray-700">{progress} / 12</div>
    </>
  );
};

export default ProgressBar;

import {
  useStorage,
  useMutation,
  useOthers,
  useBroadcastEvent,
} from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import { useState } from "react";
import { VoteBoxTemplate, TemplateType, Process } from "@/lib/types";

type voteCandidate = 1 | 2 | 3 | 4 | 5;
const VoteModal = () => {
  const broadcast = useBroadcastEvent();
  const { setModalState, setModalType } = useModalStore();
  const [vote, setVote] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [voteCompleted, setVoteCompleted] = useState<boolean>(false);
  const others = useOthers().length;
  const totalPeople = others + 1;

  const handleVote = (key: voteCandidate) => () => {
    setVote(key);
    setVoteCompleted(true);
  };

  const submitVote = (vote: voteCandidate) => {
    if (vote) {
      setModalType("voteEnd");
      updateValue(vote);
    }
    //유저의 투표 상태 및 투표 정보 업데이트 추가 필요
  };
  const process = useStorage((root) => root.process);

  const latestUndoneProcess = process.find((process) => !process.done);
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

  const voteList = useStorage((root) => root.voteList);
  const layers = useStorage((root) => root.layers);
  const layerIds = useStorage((root) => root.layerIds);

  const voteTypeList = layerIds.filter((id) => layers.get(id)?.type === 8);

  const voteValueList = voteTypeList.map((v, idx) => {
    return layers.get(v)?.value as string;
  });

  const updateValue = useMutation(
    ({ storage }, vote: voteCandidate) => {
      const voteList = storage.get("voteList");
      const voteCount = voteList.get("voteCount");

      const targetVoteCount = voteCount.get(`${vote}`);
      voteCount.set(`${vote}`, targetVoteCount + 1);

      const prevTotalCount = voteList.get("totalCount");
      const newTotalCount = prevTotalCount + 1;
      voteList.set("totalCount", newTotalCount);

      //마지막 투표자는 투표단계 완료 이니시
      if (newTotalCount === totalPeople) {
        broadcast({ type: "VOTE_COMPLETED", message: "vote Complete!" });
        setModalType("voteComplete");
        setModalState(true);
        completeProcess();
      }
    },
    [voteList],
  );

  return (
    <div className="relative flex h-fit w-[64rem] flex-col items-center justify-start gap-[1.6rem] rounded-[2rem] bg-white px-[4.45rem] py-[3.2rem] shadow-2xl scrollbar-hide">
      <div className="flex w-full flex-col items-start justify-start gap-[1.2rem]">
        <h1 className="highlight text-[1.6rem] font-bold leading-[1.2rem] tracking-[-0.08rem]">
          우리팀이 해결하고자 하는 문제 상황을 정해봐요 !
        </h1>
        <p className="leading-1 text-left text-[1.4rem] font-normal text-div-text">
          이제 팀 전체가 초점을 맞출 문제 상황을 투표를 통해 결정할 시간입니다.
          흥미로운 문제 상황이나, 심각한 문제 상황 등 여러 관점에서 고려해
          하나의 문제 상황을 투표해주세요 !
        </p>
      </div>
      <div className="flex h-fit w-full items-center justify-center p-[1.2rem]">
        <div className="grid grid-cols-3 grid-rows-2 gap-[4rem]">
          {voteValueList &&
            voteValueList.map((v, index) => (
              <div
                key={index}
                className={`flex h-[14.6rem] w-[14.6rem] cursor-pointer items-center justify-center rounded-full border-[0.4rem] text-gray-200 hover:border-primary-200 hover:text-primary-200 ${
                  vote === index + 1
                    ? "border-primary bg-primary text-white"
                    : ""
                }`}
                onClick={handleVote((index + 1) as voteCandidate)}
              >
                <span className="h-[14.6rem] text-[9.6rem] font-semibold leading-[16.6rem] ">
                  {index + 1}
                </span>
              </div>
            ))}
        </div>
      </div>

      <button
        className={`mt-[1.6rem] flex h-[4.8rem] w-full cursor-pointer items-center justify-center rounded-[1.2rem]  p-[1.6rem] text-[1.6rem] font-semibold text-white ${vote === null ? "bg-light-gray-100 text-gray-200" : "bg-primary"}`}
        onClick={() => {
          vote && submitVote(vote);
        }}
      >
        투표하기
      </button>
    </div>
  );
};

export default VoteModal;

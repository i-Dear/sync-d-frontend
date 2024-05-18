import {
  useStorage,
  useMutation,
  useOthers,
  useBroadcastEvent,
} from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import { useState } from "react";
import { ThirdStepProbTemplate, TemplateType, Process } from "@/lib/types";

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

  const templates = useStorage((root) => root.templates);

  //투표 리스트에서 +를 제외하고 1~n번까지 불러옴
  const votelist = templates.filter(
    (v) => v.type === TemplateType.ThirdStepProb && v.value !== 0,
  ) as ThirdStepProbTemplate[];
  // console.log(votelist);

  const submitVote = (vote: voteCandidate) => {
    if (vote) {
      setModalType("complete");
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

  const updateValue = useMutation(
    ({ storage }, vote: voteCandidate) => {
      const voteList = storage.get("voteList");
      const voteCount = voteList.get("voteCount");

      const targetVoteCount = voteCount.get(`${vote}`);
      voteCount.set(`${vote}`, targetVoteCount + 1);

      const prevTotalCount = voteList.get("totalCount");
      const newTotalCount = prevTotalCount + 1;
      voteList.set("totalCount", newTotalCount);

      console.log("prevTotalCount", prevTotalCount);
      console.log("newTotalCount", newTotalCount);

      if (newTotalCount === totalPeople) {
        //투표 알고리즘
        // const voteCountObject = voteCount.toObject();
        // let maxVotes = 0;
        // let winningVote = null;

        // for (const [key, value] of Object.entries(voteCountObject)) {
        //   console.log(key, value);
        //   if (value > maxVotes) {
        //     maxVotes = value;
        //     winningVote = key;
        //   }
        // }

        // console.log("최다 득표 번호:", winningVote, "번", "득표수:", maxVotes);

        // //voteStore초기화. 테스트용.
        // voteCount.update({
        //   "1": 0,
        //   "2": 0,
        //   "3": 0,
        //   "4": 0,
        //   "5": 0,
        // });
        // voteList.set("totalCount", 0);
        broadcast({ type: "VOTE_END", message: "sync Complete!" });
        setModalType("voteComplete");
        setModalState(true);
        completeProcess();
      }
    },
    [voteList],
  );

  return (
    <div className=" flex h-full w-full flex-col bg-white">
      <div className="border-grey-100 flex h-[50px] items-center justify-center border p-[8px]">
        투표
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid grid-cols-3 grid-rows-2 gap-[8rem]">
          {votelist.map((v, index) => (
            <div
              key={index}
              className={`flex h-[20rem] w-[20rem] items-center justify-center rounded-full border font-mono text-9xl font-semibold text-gray-200 ${
                vote === index + 1 ? "bg-primary" : ""
              }`}
              onClick={handleVote((index + 1) as voteCandidate)}
            >
              {v.value}
            </div>
          ))}
        </div>
      </div>
      <div className="border-grey-100 flex h-[50px] items-center justify-center gap-[3rem] border p-[8px]">
        <button
          onClick={() => {
            vote && submitVote(vote);
          }}
          className="w-[80px] cursor-pointer rounded-2xl bg-primary-500 p-2 text-center text-[18px] text-white"
        >
          완료
        </button>
        <button
          className="w-[80px] cursor-pointer rounded-2xl bg-primary  p-2 text-center text-[18px] text-white"
          onClick={() => setModalState(false)}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default VoteModal;

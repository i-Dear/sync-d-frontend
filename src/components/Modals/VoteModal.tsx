import { useStorage, useMutation } from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import { useState } from "react";
import { TemplateType } from "@/lib/types";
import { useOthers, useSelf } from "~/liveblocks.config";
import { ThirdStepProbTemplate } from "@/lib/types";

const VoteModal = () => {
  const { setModalState, setModalType } = useModalStore();
  const [vote, setVote] = useState<number | null>(null);
  const [voteCompleted, setVoteCompleted] = useState<boolean>(false);
  const others = useOthers().length;
  const totalPeople = others + 1;

  const handleVote = (key: number) => () => {
    setVote(key);
    setVoteCompleted(true);
  };

  const templates = useStorage((root) => root.templates);

  //투표 리스트에서 +를 제외하고 1~n번까지 불러옴
  const votelist = templates.filter(
    (v) => v.type === TemplateType.ThirdStepProb && v.value !== 0,
  ) as ThirdStepProbTemplate[];
  console.log(votelist);

  const submitVote = (vote: number) => {
    if (vote) {
      setModalType("complete");
      updateValue(vote);
    }
    //유저의 투표 상태 및 투표 정보 업데이트 추가 필요
  };

  //votelist에서 해당 표 +1 하고 총 표수 +1 해주기
  const updateValue = useMutation(({ storage }, vote) => {
    const votelist = storage.get("votelist");
    const currentActive = votelist.get("active");
    votelist.set(vote, votelist.get(vote) + 1);
    votelist.set("active", currentActive + 1);
    if (currentActive === totalPeople) {
      //투표 알고리즘
    }
  }, []);

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
              onClick={handleVote(index + 1)}
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

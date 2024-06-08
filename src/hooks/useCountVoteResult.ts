import { useMutation } from "~/liveblocks.config";

const useCountVoteResult = () => {
  return useMutation(({ storage }) => {
    const voteList = storage.get("voteList");
    const voteCount = voteList.get("voteCount");

    const voteCountObject = voteCount.toObject();
    let maxVotes = 0;
    let winningVote = null;

    for (const [key, value] of Object.entries(voteCountObject)) {
      if (value > maxVotes) {
        maxVotes = value;
        winningVote = key;
      }
    }
    const initVote = () => {
      voteCount.update({
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
      });
      voteList.set("totalCount", 0);
    };
    return { winningVote, initVote };
  }, []);
};
export default useCountVoteResult;

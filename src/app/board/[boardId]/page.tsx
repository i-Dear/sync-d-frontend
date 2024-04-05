import Room from "@/components/Room";

const BoardIdPage = ({
  params,
}: {
  params: {
    boardId: string;
  };
}) => {
  console.log("searchParams", params.boardId);
  return (
    <main className="w-full h-full relative bg-surface-canvas touch-none">
      <Room roomId={params.boardId} />
    </main>
  );
};

export default BoardIdPage;

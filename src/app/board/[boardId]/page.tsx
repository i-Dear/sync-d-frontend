import Room from "@/components/Room";

const BoardPage = ({
  params,
}: {
  params: {
    boardId: string;
  };
}) => {
  return (
    <main className="relative h-full w-full touch-none bg-surface-canvas">
      <Room roomId={params.boardId} />
    </main>
  );
};

export default BoardPage;

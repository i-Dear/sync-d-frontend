"use client";

import Room from "@/components/Room";
import useAuth from "@/hooks/useAuth";

const BoardIdPage = ({
  params,
}: {
  params: {
    boardId: string;
  };
}) => {
  useAuth();
  return (
    <main className="relative h-full w-full touch-none bg-surface-canvas">
      <Room roomId={params.boardId} />
    </main>
  );
};

export default BoardIdPage;

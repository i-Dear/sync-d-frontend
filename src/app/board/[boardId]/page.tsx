"use client";

import Room from "@/components/Room";
import Modal from "@/components/Modals";

const BoardIdPage = ({
  params,
}: {
  params: {
    boardId: string;
  };
}) => {
  return (
    <main className="relative h-full w-full touch-none bg-surface-canvas">
      <Room roomId={params.boardId} />
      <Modal />
    </main>
  );
};

export default BoardIdPage;

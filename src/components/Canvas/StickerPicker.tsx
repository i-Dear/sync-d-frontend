import stickerData from "@/lib/sticker.json";
import Image from "next/image";
import useStickerStore from "@/store/useStickerSrcStore";
import XMarkIcon from "~/public/Xmark";
import { X } from "lucide-react";

const StickerPicker = () => {
  const { setStickerSrc } = useStickerStore();
  return (
    <div className="max-w-600 absolute bottom-1/2 z-10 flex -translate-x-1/2 -translate-y-1/4 transform flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md">
      {/* <div className="flex w-full justify-end" onClick={handleClose}>
        <XMarkIcon width={24} height={24} fill="#000000" />
      </div> */}
      <div className="grid grid-cols-10 items-center gap-4">
        {stickerData.map((sticker, i) => (
          <Image
            className="cursor-pointer hover:bg-gray-200"
            src={sticker.src}
            alt=""
            key={i}
            width={24}
            height={24}
            onClick={() => setStickerSrc(sticker.src)}
          />
        ))}
      </div>
    </div>
  );
};

export default StickerPicker;

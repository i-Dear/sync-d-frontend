// StickerPicker.js

import React, { useState, useContext } from "react";
import stickerData from "@/lib/sticker.json";
import Image from "next/image";
import useStickerStore from "@/store/useStickerSrcStore";

const StickerPicker = () => {
  const { setStickerSrc } = useStickerStore();

  return (
    <div className="absolute bottom-1/2 transform -translate-x-1/2 -translate-y-1/4 bg-white p-4 rounded-lg shadow-md z-10 flex flex-col items-center justify-center max-w-600">
      <div className="flex gap-4  flex-wrap justify-center">
        {stickerData.map((sticker, i) => (
          <Image
            className="hover:bg-gray-200 cursor-pointer"
            src={sticker.src}
            alt=""
            key={i}
            width={48}
            height={48}
            onClick={() => setStickerSrc(sticker.src)}
          />
        ))}
      </div>
    </div>
  );
};

export default StickerPicker;

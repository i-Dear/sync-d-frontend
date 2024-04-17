import stickerData from "@/lib/sticker.json";
import Image from "next/image";

const StickerPicker = () => {
  const { setSticker } = useContext(StickerContext);

  return (
    <div className="max-w-600 absolute bottom-1/2 z-10 flex -translate-x-1/2 -translate-y-1/4 transform flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md">
      <div className="flex flex-wrap  justify-center gap-4">
        {stickerData.map((sticker, i) => (
          <Image
            className="cursor-pointer hover:bg-gray-200"
            src={sticker.src}
            alt=""
            key={i}
            width={48}
            height={48}
            onClick={() => setSticker(sticker.src)}
          />
        ))}
      </div>
    </div>
  );
};

export default StickerPicker;

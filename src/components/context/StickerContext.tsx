import { createContext, useState } from "react";
import stickerData from "@/lib/sticker.json";

interface StickerContextValue {
  stickerSrc: string;
  setSticker: React.Dispatch<React.SetStateAction<string>>;
}

const defaultSrc =
  //   name: stickerData[0].name,
  stickerData[0].src;

export const StickerContext = createContext<StickerContextValue>({ stickerSrc: defaultSrc, setSticker: () => {} });

export const StickerProvider = ({ children }) => {
  const [stickerSrc, setSticker] = useState(defaultSrc);
  return <StickerContext.Provider value={{ stickerSrc, setSticker }}>{children}</StickerContext.Provider>;
};

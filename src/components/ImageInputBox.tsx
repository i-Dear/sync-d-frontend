import { cn } from "@/lib/utils";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

type ImageInputBoxProps = {
  ImageState: {
    contentImage: File | null;
    setContentImage: (image: File) => void;
  };
};

const ImageInputBox = ({ ImageState }: ImageInputBoxProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrl, setContentImageUrl] = useState<string | null>(null);

  const { contentImage, setContentImage } = ImageState;

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };

  const readImage = (image: File) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      setContentImageUrl(String(e.target?.result));
    };
    reader.readAsDataURL(image);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setContentImage(e.dataTransfer.files[0]);
    readImage(e.dataTransfer.files[0]);
    setIsDragging(false);
  };

  const onContentImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setContentImage(e.target.files[0]);
      readImage(e.target.files[0]);
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".png,.jpg,.jpeg"
        id="input-file"
        className="hidden"
        aria-hidden
        onChange={onContentImageChange}
      />
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={cn(
          "flex h-[21.5rem] w-[48rem] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 py-[5.6rem]",
          {
            "bg-gray-100": isDragging,
          },
        )}
      >
        {imageUrl ? null : (
          <>
            <h3 className="text-[1.8rem] font-bold text-div-text">Image</h3>
            <span className="text-[1.4rem] font-light text-div-text">
              Draw or upload your project&apos;s thumbnail
            </span>
            <label
              htmlFor="input-file"
              role="button"
              className="mt-[1.6rem] flex h-[4rem] w-[10rem] items-center justify-center rounded-[1.2rem] bg-light-gray-100 text-[1.4rem] font-bold"
            >
              Upload file
            </label>
          </>
        )}
        {imageUrl && (
          <div className="flex items-center justify-center">
            <Image
              src={imageUrl}
              alt="projectThumbnail"
              width={250}
              height={250}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ImageInputBox;

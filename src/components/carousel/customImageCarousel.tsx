import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const CustomFileCarousel = ({ files }: any) => {
  const [active, setActive] = useState<number>(0);

  const RenderFiles = ({ file }: any) => {
    if (file?.file?.type.startsWith("image/")) {
      return (
        <img
          className="cursor-pointer object-contain w-full h-full"
          src={file?.previewUrl}
          alt="selected-Image"
        />
      );
    }
    if (file?.file?.type.startsWith("video/")) {
      return (
        <video className="cursor-pointer h-full w-full object-cover" controls={false} autoPlay loop>
          <source src={file?.previewUrl} type={file?.file?.type} />
        </video>
      );
    }
    return null;
  };

  const handlePrev = () => {
    setActive((prev) => (prev > 0 ? prev - 1 : files.length - 1));
  };

  const handleNext = () => {
    setActive((prev) => (prev < files.length - 1 ? prev + 1 : 0));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(), // Swipe left for next
    onSwipedRight: () => handlePrev(), // Swipe right for previous

    trackMouse: true,
    trackTouch: true,
  });

  const handleDotClick = (selectedIdx: number) => {
    setActive(selectedIdx);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div {...handlers} className="flex  relative w-[90%] h-[200px] overflow-hidden  rounded-lg">
        <div className="absolute top-2 right-2 bg-gray-100 opacity-70 rounded-full h-[20px] w-[40px] z-20 text-center text-sm">
          {active + 1}/{files?.length}
        </div>
        <div
          className="flex transition-transform duration-300 "
          style={{
            transform: `translateX(-${active * 100}%)`,
            width: `${files.length * 100}%`,
          }}
        >
          {files.map((item: any, idx: any) => (
            <div key={idx} className="w-full h-full flex-shrink-0">
              <RenderFiles file={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-1 my-2">
        {files?.map((_item: any, idx: number) => (
          <div
            onClick={() => handleDotClick(idx)}
            key={idx}
            className={`${
              active === idx ? "bg-black" : "bg-gray-200"
            } w-[15px] h-[15px] rounded-full cursor-pointer`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CustomFileCarousel;

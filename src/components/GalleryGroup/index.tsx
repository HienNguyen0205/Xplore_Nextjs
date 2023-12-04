import React from "react";
import { galleryGroupProps } from "@/utils/types";
import { CldImage } from "next-cloudinary";

const GalleryGroup = (props: galleryGroupProps) => {
  const { imgSrc, region } = props;

  const scrollToGallery = () => {
    document.querySelector(`#${region}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  return (
    <div className="w-fit">
      <div
        className="rounded overflow-hidden w-[260px] aspect-square cursor-pointer"
        onClick={scrollToGallery}
      >
        <CldImage
          className="aspect-square transition duration-300 hover:scale-110"
          width={260}
          height={260}
          src={imgSrc}
          alt="galleryGroupImg"
        />
      </div>
      <h5 className="text-center text-2xl font-medium mt-4">{region}</h5>
    </div>
  );
};

export default GalleryGroup
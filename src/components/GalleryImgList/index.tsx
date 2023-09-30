import React from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import { galleryImgListProps } from "@/utils/types";
import { CldImage } from "next-cloudinary";

const GalleryImgList = (props: galleryImgListProps) => {
  const { region, imgList } = props;

  return (
    <div id={region} className="my-20">
      <h1 className="text-center text-5xl font-semibold mb-6">{region}</h1>
      <LightGallery
        elementClassNames="grid md:grid-cols-3 sm:grid-cols-2 gap-4"
        speed={500}
        plugins={[lgZoom]}
      >
        {imgList.map((item, index) => {
          return (
            <div key={index} className="cursor-pointer overflow-hidden group">
              <CldImage
                className="transition group-hover:scale-110"
                width={1920}
                height={1080}
                src={item}
                alt="gallery_img"
                fillBackground
              />
            </div>
          );
        })}
      </LightGallery>
    </div>
  );
};

export default GalleryImgList
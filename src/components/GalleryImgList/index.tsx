import React from "react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
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
        plugins={[lgThumbnail]}
      >
        {imgList.map((item, index) => {
          return (
            <a
              data-lg-size='1920-1080'
              key={index}
              className="cursor-pointer"
              data-src={item.fullLink}
              data-sub-html={`<h1>${item.title}</h1><p>${item.description}</p>`}
            >
              <CldImage
                width={1920}
                height={1080}
                src={item.src}
                alt="gallery_img"
                fillBackground
              />
            </a>
          );
        })}
      </LightGallery>
    </div>
  );
};

export default GalleryImgList;

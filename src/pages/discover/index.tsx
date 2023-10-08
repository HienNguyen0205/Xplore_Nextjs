import React from "react";
import Meta from "@/components/Layout/meta";
import db from "@/utils/database";
import {
  discoverDef,
} from "@/utils/types";
import { CldImage } from "next-cloudinary";
import { galleryimages } from "@/models";
import { galleryGroupImg } from "@/utils/data";
import { GalleryGroup, GalleryImgList } from "@/components";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";

const Discover = (props: discoverDef) => {
  const { galleryData } = props;

  return (
    <div className="bg-slate-200 flex flex-col items-center">
      <Meta
        props={{
          title: "Xplore | Discover",
        }}
      />
      <div className="relative">
        <CldImage
          width={1800}
          height={500}
          src="Background/husbetx1d0ipqosvnksy"
          alt="galleryBg"
          priority
        />
        <p className="absolute text-center bottom-[30%] text-white font-bold w-full text-5xl">
          Discover
        </p>
      </div>
      <div className="container">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 my-10 justify-items-center">
          {galleryGroupImg.map((item, index) => {
            return (
              <GalleryGroup
                key={index}
                imgSrc={item.imgSrc}
                region={item.region}
              />
            );
          })}
        </div>
        {galleryData.map((item, index) => (
          <GalleryImgList
            key={index}
            region={item.region}
            imgList={item.imageList}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;

export const getStaticProps = async () => {
  try {
    await db();
    const galleryData = await galleryimages.find();
    return {
      props: {
        galleryData: JSON.parse(JSON.stringify(galleryData)),
      },
    };
  } catch (err) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};
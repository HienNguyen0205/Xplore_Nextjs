import React from "react";
import Meta from "@/components/Layout/meta";
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import db from '@/utils/database'
import { galleryGroupProps, galleryImgListProps, discoverDef } from "@/utils/types";
import { CldImage } from "next-cloudinary";
import { galleryimages } from "@/models";
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';

const galleryGroupImg : galleryGroupProps[] = [
  {
    imgSrc: 'Background/nlqfojwt9wbh0yuw5yzk',
    region: 'Asia'
  },
  {
    imgSrc: 'Background/fx6i7rnmq7mkzpmgxfzr',
    region: 'Africa'
  },
  {
    imgSrc: 'Background/wczkt2urytrrgkjgbcqx',
    region: 'Europe'
  },
  {
    imgSrc: 'Background/szidyar7fphtisskl7ci',
    region: 'Americas'
  },
]

const GalleryImgList = (props : galleryImgListProps) => {

  console.log(props)

  const { region, imgList } = props

  return (
    <div className="my-6">
      <h1 className="text-center text-3xl font-semibold mb-3">{region}</h1>
      <LightGallery
        elementClassNames="grid lg:grid-cols-4 sm:grid-cols-2 gap-4"
        speed={500}
        plugins={[lgZoom]}
      >
        {imgList.map((item,index) => {
          return (
            <CldImage key={index}
              width={1920}
              height={1080}
              src={item}
              alt="gallery_img"
              fillBackground
            />
          )
        })}
      </LightGallery>
    </div>
  )
}

const GalleryGroup = (props: galleryGroupProps) => {

  const { imgSrc, region } = props;

  return (
    <div className="w-fit">
      <div className="rounded overflow-hidden w-[260px] aspect-square">
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

const Discover = (props : discoverDef) => {

  const { galleryData } = props

  return (
    <div className="bg-slate-200 flex flex-col items-center">
      <Meta
        props={{
          title: "Xplore | Discover",
        }}
      />
      <div>
        <div className="relative">
          <CldImage
            width={1800}
            height={500}
            src='Background/husbetx1d0ipqosvnksy'
            alt="galleryBg"
          />
          <p className="absolute text-center bottom-[30%] text-white font-bold w-full text-5xl">
            Discover
          </p>
        </div>
      </div>
      <div className="container">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 my-10 justify-items-center">
          {galleryGroupImg.map((item,index) => {
            return (
              <GalleryGroup
                key={index}
                imgSrc={item.imgSrc}
                region={item.region}
              />
            )
          })}
        </div>
        {galleryData.map((item,index) => <GalleryImgList key={index} region={item.region} imgList={item.imageList}/>)}
      </div>
    </div>
  );
};

export default Discover;

export const getStaticProps = async () => {
  try{
    await db()
    const galleryData = await galleryimages.find()
    return {
      props: {
        galleryData: JSON.parse(JSON.stringify(galleryData))
      }
    }
  }catch(err){
    return {
      props: {
          notFound: true
      }
    }
  }
}
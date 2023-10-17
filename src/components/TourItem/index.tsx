import React from "react";
import styles from "@/styles/TourList.module.scss";
import Image from "next/image";
import { tourItemProps } from "@/utils/types";
import { useRouter } from "next/router";
import { CldImage } from "next-cloudinary";
import { ratingTag } from "@/utils/function";

const TourItem = ({ data, isInWishlist, changeWishlist }: tourItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/tour-detail/${data._id}`);
  };

  const handleMouseEnter = () => {
    router.prefetch(`/tour-detail/${data._id}`)
  }

  const handleChangeWishlist = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()
    changeWishlist.mutate(data._id)
  }

  return (
    <div className={styles.tour_item} onClick={handleClick} onMouseEnter={handleMouseEnter}>
      <div className="relative overflow-hidden group">
        <CldImage
          className="w-full rounded-t-lg transition group-hover:scale-110"
          width={360}
          height={225}
          src={data.image}
          alt="tour_img"
        />
        {isInWishlist ? (
          <Image
            className="absolute top-4 right-4"
            src={require("@/assets/images/Icon/heart-active.svg")}
            alt="heart-active"
            height={24}
            width={24}
            onClick={e => handleChangeWishlist(e)}
          />
        ) : (
          <Image
            className="absolute top-4 right-4"
            src={require("@/assets/images/Icon/heart-empty.svg")}
            alt="heart-empty"
            height={24}
            width={24}
            onClick={e => handleChangeWishlist(e)}
          />
        )}
      </div>
      <div className="p-2">
        <h1 className="font-bold text-lg h-[56px]">
          {data.destination} - {data.route}
        </h1>
        <div className="flex items-center my-2">
          <div className="flex items-center py-[2px] px-2 rounded-md bg-emerald-500 text-white w-fit me-1">
            <p>{data.rating}</p>
            <Image
              className="ml-1"
              src={require("@/assets/images/Icon/star.svg")}
              alt="star"
              height={24}
              width={24}
            />
          </div>
          <p className="text-lg mx-2">|</p>
          <span className="text-emerald-500 text-lg">
            {ratingTag(data.rating)}
          </span>
        </div>
        <div className="flex justify-between items-center my-2">
          <p className="flex items-center">
            <Image
              className="mr-1"
              src={require("@/assets/images/Icon/location.svg")}
              alt="location"
              height={24}
              width={24}
            />
            {data.destination}
          </p>
          <p className="flex items-center">
            <Image
              className="mr-1"
              src={require("@/assets/images/Icon/clock.svg")}
              alt="clock"
              height={24}
              width={24}
            />
            {data.time} days
          </p>
        </div>
        <div className="flex justify-end items-end">
          <div className="inline-block text-orange-600 font-bold text-lg">
            $
          </div>
          <div className="inline-block font-bold text-2xl">{data.price}</div>
        </div>
      </div>
    </div>
  );
};

export default TourItem;

import React from "react";
import styles from "@/styles/TourList.module.scss";
import Image from "next/image";
import { tourItemProps, reviewDef } from "@/utils/types";
import { useRouter } from "next/router";
import { CldImage } from "next-cloudinary";
import { useSession, signIn } from "next-auth/react";

const calcRating = (rating: reviewDef[]) => {
  if(rating.length === 0) return { rating: '5.0', tag: "Excellent" }
  const score = rating.reduce((prev, curr) => prev + curr.rating, 0);
  const overall = Number((score / rating.length).toFixed(1));
  let tag = "";
  if (overall >= 4) tag = "Excellent";
  else if (overall >= 3) tag = "Good";
  else if (overall >= 2) tag = "Average";
  else if (overall >= 1) tag = "Fair";
  else tag = "Poor";
  return { rating: overall.toFixed(1), tag };
};

const TourItem = ({ data, isInWishlist, changeWishlist }: tourItemProps) => {
  const router = useRouter();
  const { status } = useSession()

  const checkAuthen = () => {
    if(status !== 'authenticated'){
      signIn()
      return false
    }
    return true
  }

  const handleClick = () => {
    if(checkAuthen()){
      router.push(`/tour-detail/64c675ea7016c12127968f68`);
      // router.push(`/tour-detail/${data._id}`);
    }
  };

  const handleMouseEnter = () => {
    router.prefetch(`/tour-detail/64c675ea7016c12127968f68`)
    // router.prefetch(`/tour-detail/${data._id}`)
  }

  const handleChangeWishlist = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation()
    if(checkAuthen()){
      changeWishlist.mutate(data._id)
    }
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
            <p>{calcRating(data.rating).rating}</p>
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
            {calcRating(data.rating).tag}
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

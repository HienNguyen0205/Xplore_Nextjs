import React from "react";
import styles from '@/styles/TourList.module.scss'
import dayjs from "dayjs";
import { tourDef } from "@/utils/types";
import { useRouter } from "next/router";
import { CldImage } from "next-cloudinary";
import { LocationOn, AccessTime, CalendarMonth, Star } from "@mui/icons-material";

const TourItem = ({
  data,
  showDate,
}: {
  data: tourDef;
  showDate: boolean;
}): JSX.Element => {
  const router = useRouter();

  const ratingTag = (rating: number): string => {
    if (rating >= 4) return "Excellent";
    else if (rating >= 3) return "Great";
    else return "Good";
  };

  const handleClick = () => {
    router.push(`/tour-detail/${data.routeId}?_id=${data._id}`);
  };

  return (
    <div className={styles.tour_item} onClick={handleClick}>
      <CldImage
        className="rounded-t-lg"
        width={360}
        height={225}
        src={data.image}
        alt="tour_img"
      />
      <div className="p-2">
        <h1 className="font-bold text-lg h-[56px]">
          {data.destination} - {data.route}
        </h1>
        <div className="flex items-center my-2">
          <div className="flex items-center py-[2px] px-2 rounded-md bg-emerald-500 text-white w-fit me-1">
            <p>{data.rating}</p>
            <Star sx={{ marginLeft: "4px", color: "yellow" }} />
          </div>
          <p className="text-lg mx-2">|</p>
          <span className="text-emerald-500 text-lg">
            {ratingTag(data.rating)}
          </span>
        </div>
        <div className="flex justify-between items-center my-2">
          <p>
            <LocationOn sx={{ marginRight: "3px", marginLeft: "-5px" }} />
            {data.destination}
          </p>
          <p>
            <AccessTime sx={{ marginRight: "3px" }} />
            {data.time} days
          </p>
        </div>
        {showDate && (
          <div className="my-2">
            <div className="flex items-center">
              <CalendarMonth sx={{ marginRight: "3px", marginLeft: "-5px" }} />
              <span>
                {dayjs(data.date.from).format("ddd, DD-MM-YYYY").toString()}
              </span>
            </div>
          </div>
        )}
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

export default TourItem
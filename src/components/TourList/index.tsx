import React, { useState, useEffect } from "react";
import {
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination,
  Button,
} from "@mui/material";
import { tourDef, tourListProps } from "@/utils/types";
import { LocationOn, AccessTime, CalendarMonth } from "@mui/icons-material";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/TourList.module.scss";
import dayjs from "dayjs";

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
    router.push(`/tour?_id=${data._id}`);
  };

  return (
    <div className={styles.tour_item} onClick={handleClick}>
      <div className="relative">
        <Image
          className="rounded-t-lg"
          src={require(`../../assets/images/Tour/${data.image}.webp`)}
          alt=""
        />
      </div>
      <div className="p-2">
        <h1 className="font-bold text-lg h-[56px]">{`${data.destination} - ${data.route}`}</h1>
        <div className="flex justify-start items-center my-2">
          <div className="py-[2px] px-2 rounded-md bg-emerald-500 text-white w-fit inline-block me-1">
            {data.rating}
          </div>
          <span className="text-emerald-500">{ratingTag(data.rating)}</span>
          <span className="mx-1">|</span>
          <span>{data.comments.length} comments</span>
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

const TourList = ({
  data,
  pagination = false,
  tourHeader = true,
  sortBar = false,
  isLimit = true,
  showDate = false,
  title = false,
  titleContent = '',
}: tourListProps): JSX.Element => {
  const [index, setIndex] = useState<number>(0);
  const [tourData, setTourData] = useState<tourDef[]>(data);
  const [tourList, setTourList] = useState<tourDef[]>(
    isLimit ? data.slice(0, 8) : data
  );
  const [sortType, setSortType] = useState<string>("destination");

  useEffect(() => {
    if(sortType === 'destination'){
      setTourData(data => data.sort((a, b) => a.destination > b.destination ? 1 : -1))
      console.log(tourData)
    }else if(sortType === 'date'){
      setTourData(data => data.sort((a, b) => dayjs(a.date.from).isAfter(dayjs(b.date.from)) ? 1 : -1))
    }else if(sortType === 'price'){
      setTourData(data => data.sort((a, b) => a.price - b.price))
    }else if(sortType === 'rating'){
      setTourData(data => data.sort((a, b) => a.rating - b.rating))
    }
  }, [sortType, tourData]);

  useEffect(() => {
    if (isLimit) {
      const space = 8;
      const list = tourData.slice(index * space, (index + 1) * space);
      setTourList(list);
    }
  }, [index, tourData, isLimit]);

  const handlePagination = (
    e: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setIndex(value - 1);
  };

  const handleSortType = (e: SelectChangeEvent) => {
    setSortType(e.target.value as string);
  };

  return (
    <div className="flex flex-col items-center">
      {tourHeader && (
        <div className="container flex my-10">
          <div>
            {!title && <div>
              <h1 className="text-5xl font-bold inline-block pr-2">Find</h1>
              <span className={styles.type_text}></span>
            </div>}
            <h1 className="text-5xl font-bold">{titleContent}</h1>
          </div>
        </div>
      )}
      {sortBar && (
        <div className="container bg-slate-300 rounded-md flex justify-between items-center my-3">
          <span className="flex flex-1 justify-center">Sort by:</span>
          <Button sx={{ flex: 1 }} onClick={() => setSortType("destination")}>
            Name
          </Button>
          <Button sx={{ flex: 1 }} onClick={() => setSortType("date.from")}>
            Date
          </Button>
          <Button sx={{ flex: 1 }} onClick={() => setSortType("price")}>
            Price
          </Button>
        </div>
      )}
      {tourList.length !== 0 ? (
        <div className="container grid grid-cols-4 gap-4 mb-5">
          {tourList.map((item, index) => {
            return <TourItem key={index} data={item} showDate={showDate} />;
          })}
        </div>
      ) : (
        <div className="container">
          <p className="text-center text-red-600 text-xl font-semibold my-10">
            No tour found
          </p>
        </div>
      )}
      {pagination && isLimit && (
        <Pagination
          sx={{ justifySelf: "center", marginBottom: "12px" }}
          size="large"
          variant="outlined"
          shape="rounded"
          count={Math.ceil(data.length / 8)}
          onChange={handlePagination}
        />
      )}
    </div>
  );
};

export default TourList;
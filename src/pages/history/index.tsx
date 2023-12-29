import React, { useState } from "react";
import Meta from "@/components/Layout/meta";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import dynamic from "next/dynamic";
import { DatePicker } from "@mui/x-date-pickers";
import { history } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "@/utils/query";
import { Tooltip, IconButton } from "@mui/material";
const HistoryDetail = dynamic(() => import("@/components/HistoryDetail"));
const MakeReview = dynamic(() => import('@/components/MakeReview'))

const History = () => {
  const [from, setFrom] = useState<Dayjs>(
    dayjs(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
  );
  const [to, setTo] = useState<Dayjs>(dayjs(new Date()));
  const [openHisDetail, setHisDetailOpen] = useState<boolean>(false);
  const [openRating, setOpenRating] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(0);
  const [history, setHistory] = useState<history[]>([]);

  const { isSuccess } = useQuery({
    queryKey: ["history", from, to],
    queryFn: () => getHistory(from.toISOString(), to.toISOString()),
    onSuccess: (data) => setHistory(data.history),
  });

  const handleClickOverlay = () => {
    if(openHisDetail){
      setHisDetailOpen(false)
    }else{
      setOpenRating(false)
    }
  }

  const handleClickHisItem = (index: number) => {
    setIndex(index);
    setHisDetailOpen(true);
  };

  const handleClickRating = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    e.stopPropagation()
    setIndex(index)
    setOpenRating(true)
  }

  return (
    <div className="bg-slate-100 flex justify-center relative h-screen">
      <Meta
        props={{
          title: "Xplore | History",
          robots: "none",
        }}
      />
      <div className="container mt-[92px]">
        <div className="flex justify-between items-center my-6">
          <h1 className="text-4xl font-medium">Order History</h1>
          <div className="flex items-center">
            <DatePicker
              label="From"
              value={from}
              onChange={(value) => setFrom(value as Dayjs)}
            />
            <p className="text-3xl font-medium mx-3">-</p>
            <DatePicker
              label="To"
              value={to}
              onChange={(value) => setTo(value as Dayjs)}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-x-1 py-1 px-6 mt-6 rounded-md bg-slate-300 text-lg font-medium">
          <p
            className="flex items-center justify-center"
            style={{ gridArea: "1 / 1 / 2 / 3" }}
          >
            Tour Name
          </p>
          <p className="flex items-center justify-center">Booking Date</p>
          <p className="flex items-center justify-center">Payment Method</p>
          <p className="flex items-center justify-center">Status</p>
          <p className="flex items-center justify-center">Total</p>
          <p className="flex items-center justify-center">Action</p>
        </div>
        <div className="h-[65vh] py-3 overflow-y-auto">
          {history?.length > 0 ? (
            history.map((item, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-7 gap-x-1 py-1 px-6 my-1 rounded-md bg-slate-300 text-lg cursor-pointer"
                  onClick={() => handleClickHisItem(index)}
                >
                  <p
                    className="flex items-center justify-center"
                    style={{ gridArea: "1 / 1 / 2 / 3" }}
                  >
                    {item.tour.destination} | {item.tour.route}
                  </p>
                  <p className="flex items-center justify-center">
                    {dayjs(item.time).format("DD/MM/YYYY")}
                  </p>
                  <p className="flex items-center justify-center">
                    {item.paymentMethod}
                  </p>
                  <p
                    className="flex items-center justify-center"
                    style={
                      item.status === "Success"
                        ? { color: "#21BF73" }
                        : { color: "#1A5D1A" }
                    }
                  >
                    <Image
                      className="mr-1"
                      src={require(`@/assets/images/Icon/${
                        item.status === "Success" ? "tick" : "cross"
                      }.svg`)}
                      alt="status_icon"
                      width={24}
                      height={24}
                    />
                    {item.status}
                  </p>
                  <p className="flex items-center justify-center">
                    ${item.total}
                  </p>
                  <div className="flex justify-around items-center">
                    <Tooltip title="Write a review">
                      <IconButton color="primary" disabled={history[index].isReview} onClick={e => handleClickRating(e, index)}>
                        <Image
                          src={require("@/assets/images/Icon/message-blue.svg")}
                          alt=""
                          height={28}
                          width={28}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Report">
                      <IconButton>
                        <Image
                          src={require("@/assets/images/Icon/danger.svg")}
                          alt=""
                          height={28}
                          width={28}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-2xl font-semibold text-red-400 my-6 text-center">
              {isSuccess ? "History is empty" : ""}
            </p>
          )}
        </div>
      </div>
      {(openHisDetail || openRating) && (
        <>
          <div
            className="absolute inset-0 z-10 bg-[rgba(148,163,184,0.5)]"
            onClick={handleClickOverlay}
          ></div>
          {(history && openHisDetail) && (
            <HistoryDetail setOpen={setHisDetailOpen} history={history[index]} />
          )}
          {(history && openRating) && (
            <MakeReview setOpen={setOpenRating} tourId={history[index].tour._id}/>
          )}
        </>
      )}
    </div>
  );
};

export default History;

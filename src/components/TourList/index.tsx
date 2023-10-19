import React, { useState, useEffect } from "react";
import styles from "@/styles/TourList.module.scss";
import { toast } from "react-toastify";
import { Pagination, Button } from "@mui/material";
import { tourDef, tourListProps } from "@/utils/types";
import { TourItem } from '@/components'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWishlist, setWishlist } from "@/utils/query";

const TourList = ({
  tour,
  pagination = false,
  tourHeader = true,
  sortBar = false,
  isLimit = true,
  title = false,
  titleContent = "",
  isOnlyWishlist = false,
}: tourListProps) => {
  const [index, setIndex] = useState<number>(0);
  const [tourData, setTourData] = useState<tourDef[]>(tour);
  const [tourList, setTourList] = useState<tourDef[]>(
    isLimit ? tour.slice(0, 8) : tour
  );
  const [sortType, setSortType] = useState<string>("destination");

  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishlist(false),
  })

  const updateWishlist = useMutation({
    mutationFn: (id: string) => setWishlist(id),
    onSuccess: (data) => {
      if(data.code === 0){
        toast.success(updateWishlist.data.message)
      }
      queryClient.invalidateQueries({
        queryKey: ['wishlist']
      })
    }
  })

  useEffect(() => {
    if (sortType === "destination") {
      setTourData((data) =>
        data.sort((a, b) => (a.destination > b.destination ? 1 : -1))
      );
    } else if (sortType === "price") {
      setTourData((data) => data.sort((a, b) => a.price - b.price));
    } else if (sortType === "rating") {
      setTourData((data) => data.sort((a, b) => a.rating - b.rating));
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

  return (
    <div className="w-full flex flex-col items-center">
      {tourHeader && (
        <div className="container flex my-10">
          <div>
            {!title && (
              <div>
                <h1 className="text-5xl font-bold inline-block pr-2">Find</h1>
                <span className={styles.type_text}></span>
              </div>
            )}
            <h1 className="text-5xl font-bold">{titleContent}</h1>
          </div>
        </div>
      )}
      {sortBar && (
        <div className="container bg-slate-300 rounded-md flex justify-between items-center my-3">
          <span className="flex flex-1 justify-center">Sort by:</span>
          <Button sx={sortType === 'destination' ? { color: '#EC53B0', flex: 1 } : { flex: 1}} onClick={() => setSortType("destination")}>
            Name
          </Button>
          <Button sx={sortType === 'date' ? { color: '#EC53B0', flex: 1 } : { flex: 1}} onClick={() => setSortType("date")}>
            Date
          </Button>
          <Button sx={sortType === 'price' ? { color: '#EC53B0', flex: 1 } : { flex: 1}} onClick={() => setSortType("price")}>
            Price
          </Button>
        </div>
      )}
      {tourList.length !== 0 ? (
        <div className="container grid lg:grid-cols-4 sm:grid-cols-2 gap-4 mb-5">
          {tourList.map((item, index) => {
            if(isOnlyWishlist && data?.wishlist.includes(item._id)){
              return <TourItem key={index} data={item} isInWishlist={true} changeWishlist={updateWishlist}/>;
            }
            return <TourItem key={index} data={item} isInWishlist={data?.wishlist.includes(item._id)} changeWishlist={updateWishlist}/>;
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
          count={Math.ceil(tour.length / 8)}
          onChange={handlePagination}
        />
      )}
    </div>
  );
};

export default TourList;
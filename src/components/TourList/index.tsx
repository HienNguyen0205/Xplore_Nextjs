'use client'
import React, { useState, useEffect } from "react"
import { Select, SelectChangeEvent, MenuItem, InputLabel, FormControl, Pagination } from '@mui/material'
import { tourDef, tourListProps } from "@/utils/types"
import { LocationOn, AccessTime, StarRate } from "@mui/icons-material"
import Image from "next/image"
import styles from '@/styles/TourList.module.scss'
import axios from "axios"

const TourItem = ({data}: {data: tourDef}): JSX.Element => {

    const ratingTag = (rating: number) : string => {
        if(rating >= 4) return 'Excellent'
        else if(rating >= 3) return 'Great'
        else return 'Good'
    }

    return (
        <div className={styles.tour_item}>
            <div className="relative">
                <Image className="rounded-t-lg" src={require(`../../assets/images/Tour/${data.image}.webp`)} alt=''/>
            </div>
            <div className="p-2">
                <h1 className="font-bold text-lg h-[56px]">{data.title}</h1>
                <div className="flex justify-start items-center my-2">
                    <div className="py-[2px] px-2 rounded-md bg-emerald-500 text-white w-fit inline-block me-1">{data.rating}</div>
                    <span className="text-emerald-500">{ratingTag(data.rating)}</span>
                    <span className="mx-1">|</span>
                    <span>{data.comment.length} comments</span>
                </div>
                <div className="flex justify-between items-center my-1">
                    <p><LocationOn sx={{marginRight: '3px', marginLeft: '-5px'}}/>{data.departure}</p>
                    <p><AccessTime sx={{marginRight: '3px'}}/>{data.time} days</p>
                </div>
                <div className="flex justify-end items-end">
                    <div className="inline-block text-orange-600 font-bold text-lg">$</div>
                    <div className="inline-block font-bold text-2xl">{data.price}</div>
                </div>
            </div>
        </div>
    )
}

const TourList = ({data, option = false, pagination = false}: tourListProps): JSX.Element => {

    const [index, setIndex] = useState<number>(0)
    const [tourData, setTourData] = useState<tourDef[]>(data)
    const [tourList, setTourList] = useState<tourDef[]>(data.slice(0,8))
    const [sortType, setSortType] = useState<string>('destination')

    useEffect(() => {
        const space = 8
        const list = tourData.slice(index * space, (index + 1) * space)
        setTourList(list)
    }, [index, tourData])

    useEffect(() => {
        axios.get('/api/services/get-tour-by-order', {
            params: {
                attr: sortType
            }
        }).then(res => {
            setIndex(0)
            setTourData(res.data.tourOrder)
        }).catch(err => {
            console.error(err);
        })
    }, [sortType])

    const handlePagination = (e: React.ChangeEvent<unknown>, value: number): void => {
        setIndex(value - 1)
    }

    const handleSortType = (e: SelectChangeEvent) => {
        setSortType(e.target.value as string)
    }

    return (
        <>
            <div className='container flex justify-between my-10'>
                <div className='title_wrap'>
                    <>
                        <h1 className='text-5xl font-bold inline-block pr-2'>Find</h1>
                        <span className={styles.type_text}></span>
                    </>
                    <h1 className='text-5xl font-bold'>Destination</h1>
                </div>
                {option && <FormControl sx={{alignSelf: 'end'}}>
                    <InputLabel id='sort_by'>Sort By</InputLabel>
                    <Select value={sortType}
                        labelId='sort_by'
                        label='Sort By'
                        onChange={handleSortType}
                        sx={{ minWidth: 120 }}
                    >
                        <MenuItem value='destination' selected>Name</MenuItem>
                        <MenuItem value='price'>Price</MenuItem>
                        <MenuItem value='time'>Time</MenuItem>
                        <MenuItem value='rating'>Rating</MenuItem>
                    </Select>
                </FormControl>}
            </div>
            <div className="container grid grid-cols-4 gap-4 m-2 mb-5">
                {tourList.map((item, index) => {
                    return (
                        <TourItem key={index} data={item} />
                    )
                })}
            </div>
            {pagination && <Pagination sx={{justifySelf: 'center'}}
                size='large' variant="outlined" shape="rounded" 
                count={Math.ceil(data.length / 8)} onChange={handlePagination}
            />}
        </>
    )
}

export default TourList
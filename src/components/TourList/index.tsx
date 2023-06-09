import React, { useState, useEffect } from "react"
import { StarRate } from '@mui/icons-material'
import { Select, SelectChangeEvent, MenuItem, InputLabel, FormControl, Pagination } from '@mui/material'
import Image from "next/image"
import styles from '@/styles/TourList.module.scss'
import axios from "axios"

interface tourProps{
    image: string,
    price: number,
    destination: string,
    time: number,
    rating: number,
    discount?: number,
}

interface tourListProps{
    data: tourProps[],
    option?: boolean,
    pagination?: boolean
}

const TourItem = ({data}: {data: tourProps}): JSX.Element => {
    return (
        <div className={styles.tour_item}>
            <div className="relative">
                <Image className="rounded-t-lg" src={require(`../../assets/images/Tour/${data.image}.jpg`)} alt=''/>
                <div className="absolute top-2 right-2 py-1 px-2 bg-slate-400 rounded-xl flex items-center">
                    <StarRate className="mx-1" sx={{color: 'yellow', fontSize: 20}}/>
                    <span className="text-white">{data.rating}</span>
                </div>
            </div>
            <div className="p-2">
                <h1 className="font-bold text-lg">{data.destination}</h1>
                <p>{data.time} days</p>
                <div className="flex justify-between items-center">
                    <div>
                        <div className="inline-block text-orange-600 font-bold text-lg">$</div>
                        <div className="inline-block font-bold text-lg">{data.price}</div>
                        <p className="inline-block text-md">/person</p>
                    </div>
                    <button className={styles.button}>Book</button>
                </div>
            </div>
        </div>
    )
}

const TourList = ({data, option = false, pagination = false}: tourListProps): JSX.Element => {

    const [index, setIndex] = useState<number>(0)
    const [tourList, setTourList] = useState<tourProps[]>(data.slice(0, 8))
    const [sortType, setSortType] = useState<string>('name')

    useEffect(() => {
        const space = 8
        const list = data.slice(index * space, index * space + space)
        setTourList(list)
    }, [index, data])

    useEffect(() => {
        axios.get('/api/services/get-tour-by-order', {
            params: {
                attr: sortType
            }
        }).then(res => {
            console.log(res);
            setTourList(res.data.tourOrder)
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
                        <MenuItem value='destination'>Name</MenuItem>
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
                count={data.length / 8} onChange={handlePagination}
            />}
        </>
    )
}

export default TourList
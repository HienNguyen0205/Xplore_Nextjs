import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { reviewProps, reviewItemProps } from '@/utils/types'
import { Rating } from '@mui/material'
import { CldImage } from 'next-cloudinary'

const ReviewItem = (props: reviewItemProps) => {

    const { user, rating, comment, time } = props

    return (
        <div className='flex py-3 border-[3px] border-dashed bg-slate-200 bg-clip-padding'>
            <div className='flex flex-col items-center ml-3 mr-6'>
                <CldImage
                    className='rounded-full'
                    src={user.avatar as string}
                    alt=''
                    width={48}
                    height={48}
                />
                <p>{user.fullName}</p>
            </div>
            <div className='flex-1 mx-2'>
                <div className='flex justify-between items-center mb-2'>
                    <Rating value={rating} readOnly/>
                    <p>{dayjs(time).format('DD/MM/YYYY')}</p>
                </div>
                <p className='pl-[3px]'>{comment}</p>
            </div>
        </div>
    )
}

const Review = (props: reviewProps) => {

    const { review } = props

    return (
        <div className='my-8'>
            <h1 className="text-2xl font-medium flex items-center">
                <Image
                  className="mr-2"
                  src={require("@/assets/images/Icon/review.svg")}
                  alt="cash"
                  height={24}
                  width={24}
                />
                Reviews
            </h1>
            <hr className="border-black my-3" />
            {review.map((item, index) => <ReviewItem key={index} user={item.user} rating={item.rating} comment={item.comment} time={item.createdAt}/>)}
        </div>
    )
}

export default Review
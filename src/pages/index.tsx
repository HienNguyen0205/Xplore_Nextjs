import React from 'react'
import db from '@/utils/database'
import dynamic from 'next/dynamic'
import { tourStatistic, tourSchedule } from '@/models'
import { Public, AttachMoney, Hotel, SentimentSatisfiedAlt, DirectionsBus, Luggage, Forum } from '@mui/icons-material'
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax'
import { tourDef, tourStatisticDef } from '@/utils/types'
import { CldImage } from 'next-cloudinary';
import { courouselData, hotelDescription } from '@/utils/data'
import { Carousel } from '@/components'
const TourList = dynamic(() => import('@/components/TourList'))
const Statistic = dynamic(() => import('@/components/Statistic'))
const FeatureItem = dynamic(() => import('@/components/FeatureItem'))

const Home = (props : {tourList: tourDef[], tourStatistic : tourStatisticDef}) => {

    const { tourList, tourStatistic } = props
    
    return (
        <div className='bg-slate-200'>
            <Carousel content={courouselData}/>
            <div className='w-full flex-col flex items-center pb-5'>
                <TourList data={tourList} titleContent='Destination'/>
            </div>
            <ParallaxBanner className="aspect-[2/1]" style={{height: '600px'}}>
                <ParallaxBannerLayer speed={-30}>
                    <CldImage className='select-none' fill src='Background/jclfs1prsslvs3tbsqym' alt='bg'/>
                </ParallaxBannerLayer>
            </ParallaxBanner>
            <div className='w-full flex justify-center'>
                <div className='container flex justify-around mt-10 mb-14'>
                    <Statistic name='Happy customer' quantity={tourStatistic.customers} icon={
                        <SentimentSatisfiedAlt sx={{fontSize: 64, margin: 'auto'}}/>
                    }/>
                    <Statistic name='Amazing tours' quantity={tourStatistic.tourNumber} icon={
                        <DirectionsBus sx={{fontSize: 64, margin: 'auto'}}/>
                    }/>
                    <Statistic name='Success tours' quantity={tourStatistic.successTour} icon={
                        <Luggage sx={{fontSize: 64, margin: 'auto'}}/>
                    }/>
                    <Statistic name='Support case' quantity={tourStatistic.supportCases} icon={
                        <Forum sx={{fontSize: 64, margin: 'auto'}}/>
                    }/>
                </div>
            </div>
            <ParallaxBanner className="aspect-[2/1]" style={{height: '600px'}}>
                <ParallaxBannerLayer speed={-30}>
                    <CldImage className='select-none' fill src='Background/rhz30vbiznmght1vwrsg' alt='bg'/>
                </ParallaxBannerLayer>
                <div className='w-full flex justify-center h-full'>
                    <div className='container grid grid-cols-3 gap-10 h-full items-center'>
                        <FeatureItem title='Handlepicked Hotels' description={hotelDescription[0]} icon={
                            <Hotel sx={{fontSize: 32}}/>
                        }/>
                        <FeatureItem title='World Class Service' description={hotelDescription[1]} icon={
                            <Public sx={{fontSize: 32}}/>
                        }/>
                        <FeatureItem title='Best Price Guarantee' description={hotelDescription[2]} icon={
                            <AttachMoney sx={{fontSize: 32}}/>
                        }/>
                    </div>
                </div>
            </ParallaxBanner>
        </div>
    )
}

export default Home

export const getStaticProps = async () => {
    try{
        await db()
        let tourData = await tourSchedule.aggregate([
            {
                $match: {
                    status: true,
                }
            },
            {
                $group: {
                    _id: '$routeId',
                    tourData: { $push: '$$ROOT' }
                }
            },
            {
                $limit: 8
            }
        ])
        tourData = tourData.map(tour => tour.tourData[0])
        const tourStatisticData = await tourStatistic.findOne()
        return {
            props: {
                tourList: JSON.parse(JSON.stringify(tourData)),
                tourStatistic: JSON.parse(JSON.stringify(tourStatisticData)),
            },
            revalidate: 10,
        }
    }catch(err){
        return {
            props: {
                notFound: true
            }
        }
    }
}
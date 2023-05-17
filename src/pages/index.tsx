import React from 'react'
import styles from '@/styles/Home.module.scss'
import db from '@/utils/database'
import Image from "next/image"
import { tour, tourStatistic } from '@/models'
import { Carousel, TourList } from '@/components'
import { Public, AttachMoney, Hotel, SentimentSatisfiedAlt, DirectionsBus, Luggage, Forum } from '@mui/icons-material'
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax'
import { countryDetail, statistic, featureItem, tourDef, tourStatisticDef } from '@/utils/types'

const courouselData: countryDetail[] = [
    {
        country: 'Chile',
        destination: 'Torres del Paine National Park',
        source: 'Chile.jpg'
    },
    {
        country: 'Croatia',
        destination: 'Plitvice Lakes National Park',
        source: 'Croatia.jpg'
    },
    {
        country: 'New Zealand',
        destination: 'Lake Tekapo',
        source: 'New-Zealand.jpg'
    },
    {
        country: 'Japan',
        destination: 'Fuji Mount',
        source: 'Japan.jpg'
    },
    {
        country: 'Viet Nam',
        destination: 'Ha Long Bay',
        source: 'VietNam.jpg'
    },
]

const hotelDescription = [
    'Epitomize excellence in service, providing a meticulously curated and luxurious experience for guests.',
    'Defined by exceptional attention to detail, personalized care, and an unwavering commitment to exceeding customer expectations',
    "Ensures that customers receive the most competitive prices available, backed by a commitment to match or beat any competitor's offer."
]

const Statistic = (props: statistic): JSX.Element => {
    return (
        <div className='flex flex-col align-middle text-center'>
            {props.icon}
            <div className='text-black text-center text-5xl font-bold'>{props.quantity}</div>
            <h5 className='text-red-500 text-center text-xl'>{props.name}</h5>
        </div>
    )
}

const FeatureItem = (props: featureItem): JSX.Element => {
    return (
        <div className={styles.feature_item}>
            <div className={styles.feature_item_icon}>{props.icon}</div>
            <h1 className='pt-16 font-bold text-2xl text-center'>{props.title}</h1>
            <p className='py-4 text-center text-xl'>{props.description}</p>
        </div>
    )
}

const Home = (props : {tourList: tourDef[], tourStatistic : tourStatisticDef}): JSX.Element => {

    const { tourList, tourStatistic } = props

    return (
        <>
            <Carousel content={courouselData}/>
            <div className='w-full flex-col bg-white flex items-center pb-5' style={{backgroundColor: '#f7f3fb'}}>
                <TourList data={tourList}/>
            </div>
            <ParallaxBanner className="aspect-[2/1]" style={{height: '600px'}}>
                <ParallaxBannerLayer speed={-30}>
                    <Image className='w-full h-full select-none object-cover' src={require('@/assets/images/HomeBg/bg_1.jpg')} alt=''/>
                </ParallaxBannerLayer>
            </ParallaxBanner>
            <div className='w-full bg-white flex justify-center'>
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
                    <Image className='w-full h-full select-none object-cover' src={require('../assets/images/HomeBg/bg_2.jpg')} alt=''/>
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
        </>
    )
}

export default Home

export const getStaticProps = async () => {
    try{
        await db()
        const tourData = await tour.find()
        const tourStatisticData = await tourStatistic.find()
        return {
            props: {
                tourList: JSON.parse(JSON.stringify(tourData)),
                tourStatistic: JSON.parse(JSON.stringify(tourStatisticData[0]))
            },
            revalidate: 10,
        }
    }catch(err){
        console.error(err)
        return {
            props: {
                notFound: true
            }
        }
    }
}
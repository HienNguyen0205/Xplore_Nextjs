import React, { useEffect } from 'react'
import MainLayout from '../Layouts/MainLayout'
import styles from '../styles/Home.module.scss'
import { Carousel, TourList } from '../components'
import { Public, AttachMoney, Hotel, SentimentSatisfiedAlt, DirectionsBus, Luggage, Forum } from '@mui/icons-material'
import { ParallaxBanner } from 'react-scroll-parallax'
import { useAppDispatch, useAppSelector } from '../hooks'

interface countryDetail {
    country: string,
    destination: string,
    source: string
}

interface statistic {
    name: string,
    quantity: number,
    icon: JSX.Element
}

interface featureItem {
    title: string,
    description: string,
    icon: JSX.Element
}

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

const Home = (): JSX.Element => {

    const tourStatistic = useAppSelector(state => state.tourStatistic.value)
    const tourList = useAppSelector(state => state.tour.value)
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(fetchTourStatistics())
    //     dispatch(fetchTour())
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    return (
        <MainLayout>
            <Carousel content={courouselData}/>
            <div className='w-full flex-col bg-white flex items-center pb-5' style={{backgroundColor: '#f7f3fb'}}>
                <TourList data={tourList}/>
            </div>
            <ParallaxBanner
                layers={[{ image: require('../assets/images/HomeBg/bg_1.jpg'), speed: -20 }]}
                className="aspect-[2/1]" style={{height: '600px'}}
            />
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
            <ParallaxBanner
                layers={[{ image: require('../Assets/Images/HomeBg/bg_2.jpg'), speed: -20 }]}
                className="aspect-[2/1]" style={{height: '600px'}}>
                <div className='w-full flex justify-center h-full'>
                    <div className='container grid grid-cols-3 gap-10 h-full items-center'>
                        <FeatureItem title='Handlepicked Hotels' description='lorem' icon={
                            <Hotel sx={{fontSize: 32}}/>
                        }/>
                        <FeatureItem title='World Class Service' description='lorem' icon={
                            <Public sx={{fontSize: 32}}/>
                        }/>
                        <FeatureItem title='Best Price Guarantee' description='lorem' icon={
                            <AttachMoney sx={{fontSize: 32}}/>
                        }/>
                    </div>
                </div>
            </ParallaxBanner>
        </MainLayout>
    )
}

export default Home
import { AlertColor } from '@mui/material';

export interface countryDetail {
    country: string,
    destination: string,
    source: string
}

export interface statistic {
    name: string,
    quantity: number,
    icon: JSX.Element
}

export interface featureItem {
    title: string,
    description: string,
    icon: JSX.Element
}

export interface tourDef {
    _id: string,
    image: string,
    price: number,
    destination: string,
    time: number,
    rating: number,
    comments: {
        content: string,
        date: string,
    }[],
    route: string,
    status: boolean,
    date: {
        from: string,
        to: string,
    },
    departure: string,
    region: string,
    routeId: string,
}

export interface tourListProps{
    data: tourDef[],
    key?: number,
    pagination?: boolean,
    tourHeader?: boolean,
    sortBar?: boolean,
    isLimit?: boolean,
    showDate?: boolean,
    title?: boolean,
    titleContent?: string,
}

export interface tourStatisticDef {
    customers: number,
    tourNumber: number,
    successTour: number,
    supportCases: number
}

export interface MetaProps {
    title: string,
    description?: string,
    robots?: string,
}

export interface toastProps {
    message: string,
    status: AlertColor,
}

export interface UserDef {
    name: string,
    email: string,
    password: string,
    tel: string,
}

export interface tourDate {
    from: Date, 
    to: Date,
}

export interface findTourProps {
    bg: 'light' | 'dark',
    defaultValue?: {
        destination: string,
        departure: string,
        checkIn: string,
    }
}

export interface tourPageProps {
    tourList: tourDef[],
    defaultValue: {
        destination: string,
        departure: string,
        checkIn: string
    }
}

export interface galleryGroupProps {
    imgSrc: string,
    region: string,
}

export interface galleryImgListProps{
    region: string,
    imgList: string[],
}

export interface discoverDef{
    galleryData: [{
        region: string,
        imageList: [string],
    }]
}

export interface infoCardProps{
    title: string,
    address: string,
    tel: string,
    email: string,
    imageSrc: string,
}

export interface tourDetailDef {
    _id: string,
    slot: number,
    date: {
        from: string,
        to: string,
    },
    comments: [{
        content: string,
        date: string,
    }],
    price: number,
    rating: number,
}

export interface tourDetailProps {
    routeSelected: tourDetailDef,
    routeData: tourDetailDef[]
}

export interface tourOptionsProps {
    routeData: tourDetailDef[]
}

export interface tourDetailStore {
    _id: string,
    slot: number,
    date: {
        from: string,
        to: string,
    },
    comments: [{
        content: string,
        date: string,
    }],
    price: number,
    rating: number,
    quantity?: number,
}
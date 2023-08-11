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
        date: Date,
    }[],
    route: string,
    status: boolean,
    date: {
        from: string,
        to: string,
    },
    departure: string,
}

export interface tourListProps{
    data: tourDef[],
    option?: boolean,
    pagination?: boolean,
    tourHeader?: boolean,
    sortBar?: boolean,
    isLimit?: boolean,
    showDate?: boolean,
}

export interface tourStatisticDef {
    customers: number,
    tourNumber: number,
    successTour: number,
    supportCases: number
}

export interface MetaProps {
    title: string,
    description: string
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
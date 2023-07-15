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
    destination: string, 
    image: string,
    price: number,
    time: number,
    rating: number,
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
import { AlertColor } from '@mui/material';
import { ReactNode } from 'react';
import { Dayjs } from 'dayjs';

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
    fullName: string,
    email: string,
    password?: string,
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

export interface pageNotFound {
    notFound: boolean
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
    date: {
        from: string,
        to: string,
    },
    price: number,
    rating: number,
    departure: string,
    route: string,
    destination: string,
}

export interface tourDetailProps {
    routeSelected: tourDetailDef,
    routeData: tourDetailDef[]
}

export interface tourOptionsProps {
    routeData: tourDetailDef[]
}

export interface routeDataDef extends tourOptionsProps{}

export interface tourDetailStore extends tourDetailDef {
    quantity?: number,
}

export interface tourPurchaseProps{
    userData: UserDef,
}

export interface confirmInfoProps extends tourPurchaseProps {
    setPaymentStep: React.Dispatch<React.SetStateAction<number>>
}

export interface purchaseMessDef {
    cardNumber?: string,
    expireDate?: string,
    cvvCode?: string,
    country?: string,
    postalCode?: string,
}

export interface carouselProps {
    content: {country: string, destination: string, source: string}[]
    duration?: number,
}

export interface layoutProps {
    meta: MetaProps,
    children: ReactNode
}

export interface inputPaymentDef{
    cardNumberRef: React.RefObject<HTMLInputElement>,
    cvvCodeRef: React.RefObject<HTMLInputElement>,
    countryRef: React.RefObject<HTMLOptionElement>,
    postalCodeRef: React.RefObject<HTMLInputElement>,
    setErrorMess: React.Dispatch<React.SetStateAction<purchaseMessDef>>
}

export interface makePaymentProps extends tourPurchaseProps{
    setPaymentStep: React.Dispatch<React.SetStateAction<number>>,
}

export interface purchaseTourDef extends inputPaymentDef, makePaymentProps {
    paymentMethod: string,
    tourDetail: tourDetailStore,
}

export interface buttonProps {
    content: string,
    bgColor: string,
    textColor?: string,
    link?: string,
    style?: object,
    onClick?: () => void
}

export interface history{
    tourId: string,
    tourName: string,
    email: string,
    quantity: number,
    time: string,
    paymentMethod: string,
    status: string,
    total: number
}

export interface historyProps {
    history: history[]
}

export interface historyParams {
    from: Dayjs | null,
    to: Dayjs | null,
}

export interface historyDetailProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    tour: history | undefined,
}

export interface tourDetailData {
    tourDetail: tourDef
}
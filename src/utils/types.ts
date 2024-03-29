import { AlertColor } from "@mui/material";
import React, { ReactNode } from "react";
import { Dayjs } from "dayjs";

export interface countryDetail {
  country: string;
  destination: string;
  source: string;
}

export interface statisticProps {
  data: tourStatisticDef;
}

export interface tourDef {
  _id: string;
  image: string;
  price: number;
  destination: string;
  time: number;
  rating: reviewDef[];
  route: string;
  departure: string;
  region: string;
}

export interface tourListProps {
  tour: tourDef[];
  key?: number;
  pagination?: boolean;
  tourHeader?: boolean;
  sortBar?: boolean;
  isLimit?: boolean;
  title?: boolean;
  titleContent?: string;
  isOnlyWishlist?: boolean;
}

export interface tourStatisticDef {
  customers: number;
  tourNumber: number;
  successTour: number;
  supportCases: number;
}

export interface MetaProps {
  title: string;
  description?: string;
  robots?: string;
}

export interface toastProps {
  message: string;
  status: AlertColor;
}

export interface UserDef {
  fullName: string;
  email?: string;
  password?: string;
  avatar?: string;
  tel?: string;
  day?: string;
  month?: string;
  year?: string;
  ratingRef?: string[],
}

export interface tourDate {
  from: Date;
  to: Date;
}

export interface findTourProps {
  bg: "light" | "dark";
  defaultValue?: {
    destination: string;
    departure: string;
    checkIn: string;
  };
}

export interface pageNotFound {
  notFound: boolean;
}

export interface tourPageProps {
  tourList: tourDef[];
  defaultValue: {
    destination: string;
    departure: string;
    checkIn: string;
  };
}

export interface galleryGroupProps {
  imgSrc: string;
  region: string;
}

export interface galleryImgListProps {
  region: string;
  imgList: {
    region: string;
    description: string;
    fullLink: string;
    src: string;
    title: string;
  }[];
}

export interface discoverDef {
  galleryData: {
    _id: string,
    imgList: {
        region: string;
        description: string;
        fullLink: string;
        src: string;
        title: string;
    }[]
  }[]
}

export interface infoCardProps {
  title: string;
  address: string;
  tel: string;
  email: string;
  imageSrc: string;
}

export interface tourDetailDef {
  _id: string;
  price: number;
  rating: Array<reviewDef>;
  departure: string;
  route: string;
  destination: string;
  wishlist: Array<string> | null;
  schedule: Array<tourScheduleDef>;

}

export interface tourScheduleDef {
  _id: string;
  slot: number;
  date: {
    from: string;
    to: string;
  };
  status: boolean;
  tour: string | tourDetailDef;
}

export interface tourDetailProps {
  tourData: tourDetailDef;
}

export interface tourOptionsProps {
  routeData: tourDetailDef;
}

export interface routeDataDef extends tourOptionsProps {}

export interface tourPurchaseProps {
  quantity: number;
  tourData: tourScheduleDef;
  userData: UserDef;
}

export interface confirmInfoProps extends tourPurchaseProps {
  setPaymentStep: React.Dispatch<React.SetStateAction<number>>;
}

export interface purchaseMessDef {
  cardNumber?: string;
  expireDate?: string;
  cvvCode?: string;
  country?: string;
  postalCode?: string;
}

export interface carouselProps {
  content: { country: string; destination: string; source: string }[];
  duration?: number;
}

export interface layoutProps {
  meta: MetaProps;
  children: ReactNode;
}

export interface makePaymentProps extends tourPurchaseProps {
  setPaymentStep: React.Dispatch<React.SetStateAction<number>>;
}

export interface buttonProps {
  children: ReactNode;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success" | "inherit";
  link?: string;
  sx?: object;
  disable?: boolean,
  size?: 'small' | 'medium' | 'large',
  fullWidth?: boolean,
  onClick?: () => void,
  variant?: 'contained' | 'text' | 'outlined',
}

export interface history {
  email: string;
  quantity: number;
  time: string;
  paymentMethod: string;
  status: string;
  total: number;
  schedule: tourScheduleDef;
  tour: tourDetailDef;
  isReview: boolean,
}

export interface historyProps {
  history: history[];
}

export interface historyParams {
  from: Dayjs | null;
  to: Dayjs | null;
}

export interface historyDetailProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  history: history | undefined;
}

export interface tourDetailData {
  tourDetail: tourDef;
}

export interface profilePageProps {
  userDetails: UserDef;
}

export interface mesResponse {
  code: number;
  message: string;
}

export interface tourItemProps {
  data: tourDef;
  isInWishlist?: boolean;
  changeWishlist?: any;
}

export interface tourSlotData {
  code: number;
  avaiSlot?: number;
  message?: string;
}

export interface wishlistProps {
  wishlist: tourDef[];
}

export interface serviceProps {
  tourData: [
    {
      _id: string;
      tourList: tourDef[];
    }
  ];
}

export interface OTPInputProps {
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  email: string,
  sendOTP: () => void,
}

export interface resetPassProps {
  email: string,
}

export interface avatarDropdownItemProps {
  changePath: (path: string) => void,
  handlePrefetch: (path: string) => void
}

export interface toastItemProps extends toastData {
  duration: number,
  handleClose: () => void,
}

export interface toastCOMProps {
  children: ReactNode,
  duration: number,
  limit: number,
}

export interface toastData {
  key: string,
  content: string,
  status: 'success' | 'error' | 'info',
  config?: toastConfig
}

export interface toastContextProps {
  success: (content: string, config?: toastConfig) => void,
  error: (content: string, config?: toastConfig) => void,
  info: (content: string, config?: toastConfig) => void,
  handleClose: (key: string) => void
}

export interface reviewDef {
  _id: string,
  rating: number,
  comment: string,
  user: UserDef,
  tour: string,
  createdAt: string,
}

export interface toastConfig {
  delay: number
}

export interface makeReviewProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  tourId: string,
}

export interface reviewItemProps {
  user: UserDef,
  rating: number,
  comment: string,
  time: string,
}

export interface reviewProps {
  review: Array<reviewDef>,
}
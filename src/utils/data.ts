import { countryDetail, galleryGroupProps } from "./types";

export const steps = ["Confirm information", "Payments", "Complete"];

export const country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;

export const cvvCodeRegex = /^[0-9]{3,4}$/;

export const courouselData: countryDetail[] = [
  {
      country: 'Chile',
      destination: 'Torres del Paine National Park',
      source: 'Carousel/csujhbh4tnrpk4x4zwa9'
  },
  {
      country: 'Croatia',
      destination: 'Plitvice Lakes National Park',
      source: 'Carousel/xypvtfthd0it63de18xr'
  },
  {
      country: 'New Zealand',
      destination: 'Lake Tekapo',
      source: 'Carousel/x7shbpwiqgsenft9qkbl'
  },
  {
      country: 'Japan',
      destination: 'Fuji Mount',
      source: 'Carousel/misg8ecxyy4nziyspoc1'
  },
  {
      country: 'Viet Nam',
      destination: 'Ha Long Bay',
      source: 'Carousel/r0v3owiletideu0lurcn'
  },
]

export const hotelDescription = [
  {
    title: 'Handlepicked Hotels',
    description: 'Epitomize excellence in service, providing a meticulously curated and luxurious experience for guests.',
    icon: require("@/assets/images/Icon/bed.svg"),
    alt: 'bed'
  },
  {
    title: 'World Class Service',
    description: 'Defined by exceptional attention to detail, personalized care, and an unwavering commitment to exceeding customer expectations.',
    icon: require("@/assets/images/Icon/earth.svg"),
    alt: 'earth'
  },
  {
    title: 'Best Price Guarantee',
    description: "Ensures that customers receive the most competitive prices available, backed by a commitment to match or beat any competitor's offer.",
    icon: require("@/assets/images/Icon/dolar.svg"),
    alt: 'dolar'
  },
]

export const defaultMetaProps = {
  title: "Xplore",
  description: "Xplore is your ultimate travel guide for discovering new destinations and planning your next adventure.",
  robots: 'all'
}

export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;

export const nameRegex = /^[a-zA-Z]{4,30}(?: [a-zA-Z]+){0,5}$/;

export const galleryGroupImg: galleryGroupProps[] = [
  {
    imgSrc: "Background/nlqfojwt9wbh0yuw5yzk",
    region: "Asia",
  },
  {
    imgSrc: "Background/fx6i7rnmq7mkzpmgxfzr",
    region: "Africa",
  },
  {
    imgSrc: "Background/wczkt2urytrrgkjgbcqx",
    region: "Europe",
  },
  {
    imgSrc: "Background/szidyar7fphtisskl7ci",
    region: "Americas",
  },
];

export const days = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
]

export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const startYear = 1900;
export const years: string[] = [];

for (let year = currentYear; year > startYear; year--) {
  years.push(year.toString());
}

export const telRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/

export const statisticData = [
  {
    name: 'Happy customers',
    data: 'customers',
    iconSrc: require('@/assets/images/Icon/happy-face.svg'),
    alt: 'happy-face'
  },
  {
    name: 'Amazing tours',
    data: 'tourNumber',
    iconSrc: require('@/assets/images/Icon/bus.svg'),
    alt: 'bus'
  },
  {
    name: 'Success tours',
    data: 'successTour',
    iconSrc: require('@/assets/images/Icon/luggage.svg'),
    alt: 'luggage'
  },
  {
    name: 'Support case',
    data: 'supportCases',
    iconSrc: require('@/assets/images/Icon/message.svg'),
    alt: 'message'
  },
]

export const dropdownAvatarData = [
  {
    path: 'profile',
    iconSrc: require("@/assets/images/Icon/user.svg"),
    content: 'Profile'
  },
  {
    path: 'history',
    iconSrc: require("@/assets/images/Icon/clock-rewind.svg"),
    content: 'History'
  },
  {
    path: 'wishlist',
    iconSrc: require("@/assets/images/Icon/list.svg"),
    content: 'Wishlist'
  },
  {
    path: 'change-password',
    iconSrc: require("@/assets/images/Icon/key.svg"),
    content: 'Change password'
  },
]

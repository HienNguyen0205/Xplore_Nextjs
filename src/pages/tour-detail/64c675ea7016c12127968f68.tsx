import React, { useState } from "react";
import Meta from "@/components/Layout/meta";
import db from "@/utils/database";
import mongoose from "mongoose";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Tab } from "@mui/material";
import { CldImage } from "next-cloudinary";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { tourSchedule } from "@/models";
import { tourDetailProps, reviewDef } from "@/utils/types";
import { TourOptions } from "@/components";
const Review = dynamic(() => import("@/components/Review"));

const calcRating = (rating: reviewDef[]) => {
  if(rating.length === 0) return { rating: '5.0', tag: "Excellent" }
  const score = rating.reduce((prev, curr) => prev + curr.rating, 0);
  const overall = Number((score / rating.length).toFixed(1));
  let tag = "";
  if (overall >= 4) tag = "Excellent";
  else if (overall >= 3) tag = "Good";
  else if (overall >= 2) tag = "Average";
  else if (overall >= 1) tag = "Fair";
  else tag = "Poor";
  return { rating: overall.toFixed(1), tag };
};

const TourDetail = (props: tourDetailProps) => {
  const { tourData } = props;

  const [tabIndex, setTabIndex] = useState<string>("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  return (
    <div className="bg-slate-100 flex flex-col items-center">
      <Meta
        props={{
          title: "Xplore | Singapore",
        }}
      />
      <div className="container relative mt-[92px]">
        <h1 className="text-4xl font-medium mt-6 mb-3">
          Singapore - Merlion Park | Fort Canning
        </h1>
        <div className="flex justify-start items-center my-4">
          <div className="rounded py-1 px-2 bg-emerald-500 text-white">
            {calcRating(tourData.rating).rating}
          </div>
          <p className="mx-3 text-xl font-medium">
            &#183; {calcRating(tourData.rating).tag} &#183;
          </p>
          <p className="text-md">{tourData.rating.length} reviews</p>
        </div>
        <div className="grid grid-cols-3 grid-rows-1 gap-x-8">
          <div style={{ gridArea: "1 / 1 / 2 / 3" }}>
            <CldImage
              className="w-full"
              width={710}
              height={406}
              src="Tour/Singapore/c8f9gemtdcbicvxtkidp"
              alt="Singapore"
              priority
            />
            <div className="flex justify-between items-center h-[60px] px-3 bg-zinc-300">
              <div className="flex items-center">
                <div className="flex items-center mr-5">
                  <Image
                    className="mr-2"
                    src={require("@/assets/images/Icon/location.svg")}
                    alt="location"
                    height={24}
                    width={24}
                  />
                  Ho Chi Minh
                </div>
                <div className="flex items-center mr-5">
                  <Image
                    className="mr-2"
                    src={require("@/assets/images/Icon/clock.svg")}
                    alt="clock"
                    height={24}
                    width={24}
                  />
                  4 Days
                </div>
                <div className="flex items-center mr-5">
                  Transportation:
                  <Image
                    className="mr-1 ml-3"
                    src={require("@/assets/images/Icon/plane.svg")}
                    alt="plane"
                    height={24}
                    width={24}
                  />
                  <Image
                    className="mr-3 ml-1"
                    src={require("@/assets/images/Icon/bus.svg")}
                    alt="bus"
                    height={24}
                    width={24}
                  />
                </div>
              </div>
            </div>
            <div className="my-8">
              <h1 className="text-2xl font-medium flex items-center">
                <Image
                  className="mr-2"
                  src={require("@/assets/images/Icon/info.svg")}
                  alt="info"
                  height={24}
                  width={24}
                />
                Tour Introduction
              </h1>
              <hr className="border-black mt-3 mb-2" />
              <p className="indent-4">
                Known for many beautiful words such as &apos;Lion Island&apos;
                or &apos;City of gardens&apos;, Singapore is famous as the
                cleanest and greenest island country in the world, where iconic
                architectural works are created. such as Gardens by the Bay, is
                home to the famous Singapore Sling cocktail, diverse street food
                and endless shopping paradise. Let&apos;s explore Singapore with
                Xplore - one of the cities known for its excellent cleanliness
                and an attractive tourist destination with lots of exciting
                activities to experience. It has countless options for visitors
                when it comes to sightseeing, entertainment, dining and
                shopping, and also has a modern and convenient MRT train system
                to move around.
              </p>
            </div>
            <div className="my-8">
              <h1 className="text-2xl font-medium flex items-center">
                <Image
                  className="mr-2"
                  src={require("@/assets/images/Icon/map.svg")}
                  alt="map"
                  height={24}
                  width={24}
                />
                Tour Schedule
              </h1>
              <hr className="border-black mt-3 mb-2" />
              <h3 className="text-xl font-medium mb-2">
                Day 1: TP. HO CHI MINH - SINGAPORE
              </h3>
              <p className="indent-4">
                07:00 AM : The delegation leader picks you up at the meeting
                point and completes departure procedures for Singapore. Go to
                Changi International Airport, complete immigration procedures in
                Singapore.
              </p>
              <p className="indent-4">
                Noon: Car and guide take the group to have a light lunch at the
                airport, then the group begins to visit:
              </p>
              <p>
                - <strong>Parliament House</strong>
              </p>
              <p>
                - <strong>Merlion Park</strong>, The symbol of Singapore.
              </p>
              <CldImage
                className="w-full my-2"
                width={710}
                height={399}
                src="Tour/Singapore/vxt3zmnmfxlhbxtup3jb"
                alt=""
              />
              <p className="text-center mb-2">Merlion Park</p>
              <p>
                - <strong>Victoria Theatre</strong> &ndash; Singapore&apos;s
                oldest theater. This place has been the focal point for the
                performing arts of the lion island nation since colonial times.
              </p>
              <p>
                - <strong>Esplanade Theater</strong> is famous for its symbol
                &quot;Durian Fruit&quot; - Singapore&apos;s most modern theater.
                This is also a world-class cultural and artistic performing
                center.
              </p>
              <CldImage
                className="w-full my-2"
                width={710}
                height={399}
                src="Tour/Singapore/hqpfwh3uvshy9t6lf0pe"
                alt=""
              />
              <p className="text-center mb-2">Esplanade Theater</p>
              <p>
                - <strong>Faber Mount</strong> - The top of the mountain of the
                Lion Island, where you can see the panoramic view of Singapore
                from above.
              </p>
              <CldImage
                className="w-full my-2"
                width={710}
                height={399}
                src="Tour/Singapore/gtykdxec6uasfgerlxoq"
                alt=""
              />
              <p className="text-center mb-2">Faber Mount</p>
              <p className="indent-4">
                Evening: The group has dinner. Check in to rest, free to play or
                join the program Singapore By Night (own expense)
              </p>
              <p>- Explore the underground life of Singaporeans by MRT.</p>
              <p>
                - Experience a cruise on the Singapore River to see the view of
                <strong>Marina Bay</strong> at night.
              </p>
              <CldImage
                className="w-full my-2"
                width={710}
                height={399}
                src="Tour/Singapore/vf4ba02jo7ul3wokikv9"
                alt=""
              />
              <p className="text-center mb-2">Marina Bay</p>
              <h3 className="text-xl font-medium my-2">
                Day 2: CITY TOUR SINGAPORE
              </h3>
              <p className="inden-4">
                Morning: The group has breakfast buffet at the hotel. After
                that, the car takes the group to visit:
              </p>
              <p>
                - <strong>Gardens by the Bay</strong> officially opened on June
                29, 2012. This is an artificial garden of more than 100
                hectares, with more than 250,000 rare plant species, with giant
                super trees taking solar energy during the day and shine at
                night. From here you can take panoramic photos of the
                &quot;Yacht&quot; located at a height of 200m on top of three
                Marina Bay Sands hotel buildings (You can take photos outside).
              </p>
              <CldImage
                className="w-full my-2"
                width={710}
                height={399}
                src="Tour/Singapore/nrzkat4m684g8ubjhhtr"
                alt=""
              />
              <p className="text-center mb-2">Garden By The Bay</p>
              <p>
                - <strong>Fort Canning Park</strong>, also known as &quot;The
                Sky Well&quot; in Singapore, brings a different beauty each
                season, all of which are extremely attractive and make every
                tourist fascinated and eager to visit once.
              </p>
              <CldImage
                className="w-full my-2"
                width={710}
                height={399}
                src="Tour/Singapore/bpvsbuspp8ahtqc0tvpz"
                alt=""
              />
              <p className="text-center mb-2">Fort Canning Park</p>
              <p className="indent-4">
                Noon: The group has a &quot;BBQ&quot; lunch with many delicious,
                fresh and attractive dishes. Then depart for Sentosa Island to
                visit Resort World - visit Asia&apos;s largest modern Casino at
                Singapore&apos;s largest 5-star hotel.
              </p>
              <p>
                - <strong>Marina Barrage</strong>: the first artificial lake
                located in the center of the city with a basin of 10,000
                hectares - the largest and most urbanized basin on the island
                nation of Singapore. Known around the world as a giant
                masterpiece of man&apos;s ability to transform nature, a place
                to display unique works of art worth admiring, It is also the
                place where many exciting water sports events take place.
              </p>
              <CldImage
                className="w-full my-2"
                width={710}
                height={399}
                src="Tour/Singapore/x7g6y309heqdbnizf0iz"
                alt=""
              />
              <p className="text-center mb-2">Marina Barrage</p>
              <p className="indent-4">
                Evening: Have dinner at the restaurant. Freely explore Singapore
                at night.
              </p>
              <h3 className="text-xl font-medium my-2">
                Day 3: SINGAPORE - JEWEL CHANGI - TP. HO CHI MINH
              </h3>
              <p className="indent-4">
                Morning: Group use buffet breakfast at the hotel to check out.
                After that, the car takes the group to visit:
              </p>
              <p>
                - Freedom to shopping the bustling mall, and discover the unique
                dishes of this clean and beautiful country.
              </p>
              <p>
                - <strong>Jewel Changi Waterfall</strong> - Singapore&apos;s
                hottest check-in place, also known as Rain Vortex, is the
                world&apos;s tallest indoor waterfall, with a height of 40m.
              </p>
              <CldImage
                className="w-full my-2"
                width={710}
                height={399}
                src="Tour/Singapore/tdq4hrm5zlzjzvuefcdd"
                alt=""
              />
              <p className="text-center mb-2">Jewel Changi Waterfall</p>
            </div>
            <div className="my-8">
              <h1 className="text-2xl font-medium flex items-center">
                <Image
                  className="mr-2"
                  src={require("@/assets/images/Icon/visa-card.svg")}
                  alt="visa-card"
                  height={24}
                  width={24}
                />
                Visa Infomation
              </h1>
              <hr className="border-black mt-3 mb-2" />
              <p>
                - An intact passport is valid for 6 months from the tour end
                date.
              </p>
              <p>- No VISA required for Vietnamese nationals.</p>
            </div>
            <div className="my-8">
              <h1 className="text-2xl font-medium flex items-center">
                <Image
                  className="mr-2"
                  src={require("@/assets/images/Icon/tourguild.svg")}
                  alt="tourguild"
                  height={24}
                  width={24}
                />
                Tour Guild
              </h1>
              <hr className="border-black mt-3 mb-2" />
              <p>
                - Tour Guide will contact you about 2-3 days before departure to
                arrange a pick-up time and provide necessary information for
                transfer.
              </p>
              <p>
                - Tour guide does airline check-in, hotel check-in, arranges
                meals and accompanies throughout the trip.
              </p>
            </div>
            <div className="my-8">
              <h1 className="text-2xl font-medium flex items-center">
                <Image
                  className="mr-2"
                  src={require("@/assets/images/Icon/cash.svg")}
                  alt="cash"
                  height={24}
                  width={24}
                />
                Expected cost
              </h1>
              <hr className="border-black mt-3 mb-2" />
              <TabContext value={tabIndex}>
                <div style={{ borderBottom: "1px" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Price include" value="1" />
                    <Tab label="Price not include" value="2" />
                    <Tab label="Surcharge" value="3" />
                    <Tab label="Cancel / Change" value="4" />
                    <Tab label="Notes" value="5" />
                  </TabList>
                </div>
                <TabPanel value="1">
                  <p>
                    - Round trip air tickets SGN - SIN - SGN (Including 20kg
                    checked baggage and 07kg carry-on baggage).
                  </p>
                  <p>- Airport security fee, airport tax of 2 countries.</p>
                  <p>
                    - Air-conditioned vehicle transport throughout the route.
                  </p>
                  <p>- Tickets to visit as program.</p>
                  <p>- Standard 3 - 4* hotel (2-3 people/room).</p>
                  <p>- Serving mineral water throughout the tour.</p>
                  <p>- Meals according to the program.</p>
                  <p>
                    - Tour leader and local tour guide serve throughout the
                    route according to the program.
                  </p>
                  <p>- Travel insurance.</p>
                </TabPanel>
                <TabPanel value="2">
                  <p>
                    - Surcharge for single room 3,600,000VND (for guests who
                    request to sleep 1 person/room).
                  </p>
                  <p>- Personal costs. Excess baggage allowance.</p>
                  <p>- Transportation outside the program + Night shows.</p>
                  <p>- Vietnam re-entry visa applies to foreign visitors.</p>
                  <p>- Tips for tour guide and driver: 15 USD/person/tour</p>
                  <p>
                    - Surcharge for guests with foreign nationality or overseas
                    Vietnamese guests with non-Vietnamese names: $20/guest
                  </p>
                </TabPanel>
                <TabPanel value="3">
                  <p>- Single room surcharge: 3,600,000 VND/person/tour.</p>
                </TabPanel>
                <TabPanel value="4">
                  <p className="indent-4">
                    Terms of tour registration: Please pay a deposit of 50% when
                    registering the tour, and the remaining payment before 10
                    days of departure.
                  </p>
                  <p className="indent-4">
                    If you cancel the tour, you pay the following tour
                    cancellation fees:
                  </p>
                  <p>
                    - Cancellation of tour after registration will incur a
                    penalty of 50% of the deposit.
                  </p>
                  <p>
                    - Cancel tour 10 days in advance, penalty fee = 70% of total
                    tour price. (Calculated based on working days).
                  </p>
                  <p className="indent-4">
                    After the above time, penalty fee = 100% of total program
                    value. (Based on working days)
                  </p>
                  <p>
                    - The cancellation of the trip must be notified directly to
                    the Company in writing or via email, phone message and must
                    be confirmed by the Company. Cancellations by phone are not
                    accepted.
                  </p>
                  <p className="indent-4">
                    Holidays are non-refundable and non-cancellable.
                  </p>
                </TabPanel>
                <TabPanel value="5">
                  <h3 className="text-lg font-semibold underline mb-2">
                    CONDITIONS & PASSPORT WHEN REGISTERING FOR TOUR:
                  </h3>
                  <p>
                    - Passport must have 6 months remaining from the date of
                    return from the tour.
                  </p>
                  <p>
                    - Passport ensures the following factors: the image is not
                    damaged, blurred, complete information, even though the
                    expiry date is still valid, if the image is blurred, it is
                    still not allowed to enter or exit.
                  </p>
                  <p>
                    - You are not allowed to exit or enter the country and
                    abroad, the company will not be responsible and will not
                    refund other related costs.
                  </p>
                  <p>
                    - Foreign nationals / overseas Vietnamese, please check the
                    visitor&apos;s visa to Vietnam multiple times or once,
                    Customers make a re-entry visa, bring 2 4x6 photos on tour,
                    and bring visa to Vietnam when entering and leaving the
                    country.
                  </p>
                  <p>
                    - When registering for a tour, please provide personal
                    information on your passport: Exact full name, date of
                    issue, passport expiration date, contact phone number,
                    contact address...
                  </p>
                  <h3 className="text-lg font-semibold underline mb-2">
                    Notes:
                  </h3>
                  <p>
                    - If you require a single room, please pay the additional
                    fee.
                  </p>
                  <p>
                    - The order of attractions and trip itinerary may change
                    depending on the actual situation but still ensures all the
                    attractions as at the beginning. The hotel name will be
                    officially confirmed on the group meeting day, 1 day before
                    departure.
                  </p>
                </TabPanel>
              </TabContext>
            </div>
            <Review review={tourData.rating} />
          </div>
          <div style={{ gridArea: "1 / 3 / 2 / 4" }}>
            <TourOptions routeData={tourData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;

export const getServerSideProps = async () => {
  const ObjectId = mongoose.Types.ObjectId;

  try {
    await db();
    const tourData = await tourSchedule
      .findOne(
        {
          _id: new ObjectId("64c675ea7016c12127968f68"),
        },
        "-wishlist"
      )
      .populate([
        {
          path: "schedule",
          select: "date",
          match: {
            status: true,
          },
          options: {
            limit: 4,
            sort: "date.from",
          },
        },
        {
          path: "rating",
          populate: {
            path: "user",
            select: "avatar fullName",
          },
        },
      ]);
    return {
      props: {
        tourData: JSON.parse(JSON.stringify(tourData)),
      },
    };
  } catch (e) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};

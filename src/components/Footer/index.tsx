import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Footer = (): JSX.Element => {
  const router = useRouter();

  const returnHome = () => {
    router.push("/");
  };

  return (
    <footer className="flex justify-center border-t-[1px] border-gray-600">
      <div className="container p-4 bg-white md:px-6 md:py-8">
        <div className="grid grid-cols-5 gap-2">
          <div style={{ gridArea: "1 / 1 / 2 / 3" }}>
            <Image
              src={require("@/assets/images/Logo/XPLORE_logo_dark.png")}
              className="h-12 mr-3 w-fit mb-4 sm:mb-0 cursor-pointer"
              alt="logo"
              priority
              onClick={returnHome}
            />
            <p className="my-4">
              Discover the world through the gateway of Xplore tickets.<br></br>
              Get ready for your amazing journey!
            </p>
            <div className="flex">
              <Image
                src={require("@/assets/images/Icon/google-play.svg")}
                className="h-12 mr-3 w-fit mb-4 sm:mb-0 cursor-pointer"
                alt="logo"
                priority
                onClick={returnHome}
              />
              <Image
                src={require("../../assets/images/Icon/app-store.svg")}
                className="h-12 mr-3 w-fit mb-4 sm:mb-0 cursor-pointer"
                alt="logo"
                priority
                onClick={returnHome}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl text-orange-600 mb-4">Support</h1>
            <Link className="text-md font-medium mb-2 hover:underline" href='/contact'>Contact</Link>
            <Link className="text-md font-medium mb-2 hover:underline" href='/contact'>Legal Notice</Link>
            <Link className="text-md font-medium mb-2 hover:underline" href='/contact'>Privacy Policy</Link>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl text-orange-600 mb-4">Company</h1>
            <Link className="text-md font-medium mb-2 hover:underline" href='/contact'>About Us</Link>
            <Link className="text-md font-medium mb-2 hover:underline" href='/contact'>Careers</Link>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl text-orange-600 mb-4">Work With Us</h1>
            <Link className="text-md font-medium mb-2 hover:underline" href='/contact'>As a Supply Partner</Link>
            <Link className="text-md font-medium mb-2 hover:underline" href='/contact'>As a Content Creator</Link>
            <Link className="text-md font-medium mb-2 hover:underline" href='/contact'>As an Affiliate Partner</Link>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex justify-between items-center my-2">
          <span className="block text-sm text-black sm:text-center">
            © 2023 Xplore™. All Rights Reserved.
          </span>
          <div className="flex">
            <Image className="mx-2 cursor-pointer" src={require('@/assets/images/Icon/facebook-black.svg')} alt="fb" height={24} width={24}/>
            <Image className="mx-2 cursor-pointer" src={require('@/assets/images/Icon/instagram.svg')} alt="instagram" height={24} width={24}/>
            <Image className="mx-2 cursor-pointer" src={require('@/assets/images/Icon/twitter.svg')} alt="twitter" height={24} width={24}/>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

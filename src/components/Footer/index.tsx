"use client";
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
        <div className="flex items-center justify-between">
          <Image
            src={require("../../assets/images/Logo/XPLORE_logo_dark.png")}
            className="h-12 mr-3 w-fit mb-4 sm:mb-0"
            alt=""
            onClick={returnHome}
          />
          <ul className="flex flex-wrap items-center mb-6 text-sm sm:mb-0">
            <li
              className="nav_link"
              style={router.pathname === "/" ? { color: "#ae3056" } : {}}
            >
              <Link href="/">HOME</Link>
            </li>
            <li
              className="nav_link"
              style={
                router.pathname === "/service" ? { color: "#ae3056" } : {}
              }
            >
              <Link href="/service">SERVICE</Link>
            </li>
            <li
              className="nav_link"
              style={
                router.pathname === "/discover" ? { color: "#ae3056" } : {}
              }
            >
              <Link href="">DISCOVER</Link>
            </li>
            <li
              className="nav_link"
              style={router.pathname === "/about" ? { color: "#ae3056" } : {}}
            >
              <Link href="">ABOUT US</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-black sm:text-center">
          © 2023 Xplore™. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
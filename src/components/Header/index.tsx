import React from "react";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Header.module.scss";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import { useQuery } from "@tanstack/react-query";
import { getAvatar } from "@/utils/query";
import { dropdownAvatarData } from "@/utils/data";
import { avatarDropdownItemProps } from "@/utils/types";

const AvatarDropdownItem = (props: avatarDropdownItemProps) => {
  const { changePath, handlePrefetch } = props;

  return (
    <>
      {dropdownAvatarData.map((item, index) => {
        return (
          <div
            key={index}
            className={styles.dropdown_item}
            onClick={() => changePath(item.path)}
            onMouseEnter={() => handlePrefetch(item.path)}
          >
            <Image src={item.iconSrc} alt="" height={24} width={24} />
            <span className={styles.dropdown_text}>{item.content}</span>
          </div>
        );
      })}
    </>
  );
};

const Header = (): JSX.Element => {
  const { status } = useSession();

  const { data } = useQuery({
    queryKey: ["avatar"],
    queryFn: getAvatar,
  });

  const router = useRouter();

  const changePath = (path: string) => {
    router.push("/" + path);
  };

  const handlePrefetch = (path: string) => {
    router.prefetch("/" + path);
  };

  return (
    <header className="flex justify-center fixed top-0 left-0 w-full h-20 z-10 bg-[rgba(0,0,0,.85)]">
      <div className="container flex items-center justify-between">
        <Image
          className="h-full py-5 object-contain flex-1 basis-1/5 cursor-pointer"
          alt="logo"
          src={require("@/assets/images/Logo/XPLORE_logo.png")}
          priority
          onClick={() => changePath("")}
          onMouseEnter={() => handlePrefetch("")}
        />
        <ul
          className="flex justify-center items-center grow-[2]"
          style={{ color: "white" }}
        >
          <li
            className="nav_link"
            style={router.pathname === "/" ? { color: "#ff4dd8" } : {}}
          >
            <Link href="/">HOME</Link>
          </li>
          <li
            className="nav_link"
            style={router.pathname === "/service" ? { color: "#ff4dd8" } : {}}
          >
            <Link href="/service">SERVICE</Link>
          </li>
          <li
            className="nav_link"
            style={router.pathname === "/discover" ? { color: "#ff4dd8" } : {}}
          >
            <Link href="/discover">DISCOVER</Link>
          </li>
          <li
            className="nav_link"
            style={router.pathname === "/contact" ? { color: "#ff4dd8" } : {}}
          >
            <Link href="/contact">CONTACT</Link>
          </li>
        </ul>
        {status === "authenticated" ? (
          <div className={styles.avatar_container}>
            <CldImage
              className={styles.avatar}
              src={data?.avatar ? data?.avatar : "User/zz1jef0uotz2qjpelgbh"}
              alt="avatar"
              height={48}
              width={48}
            />
            <div className={styles.avatar_dropdown}>
              <AvatarDropdownItem changePath={changePath} handlePrefetch={handlePrefetch}/>
              <div
                className={styles.dropdown_item}
                onClick={() =>
                  signOut({ redirect: false }).then(() => changePath(""))
                }
              >
                <Image
                  src={require("@/assets/images/Icon/log-out.svg")}
                  alt="log-out"
                  height={24}
                  width={24}
                />
                <span className={styles.dropdown_text}>Log out</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 basis-1/5">
            <Button
              content="Sign In"
              bgColor="#5a66ff"
              onClick={() => signIn()}
            />
            <Button
              content="Sign Up"
              bgColor="#008000"
              onClick={() => router.push("/sign-up")}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

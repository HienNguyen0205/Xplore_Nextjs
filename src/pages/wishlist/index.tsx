import React from "react";
import Meta from '@/components/Layout/meta'
import db from '@/utils/database'
import { wishlists } from "@/models";
import { GetServerSideProps } from "next";
import { TourList } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { pageNotFound, wishlistProps } from "@/utils/types";

const WishList = (props: wishlistProps) => {
    const { wishlist } = props

    return (
        <div className="bg-slate-200 flex justify-center">
            <Meta props={{
                title: 'Xplore | Wishlist',
                robots: 'none'
            }}/>
            <div className="container mt-[100px] min-h-[380px]">
                <TourList tour={wishlist} tourHeader={false} isLimit={false} isOnlyWishlist/>
            </div>
        </div>
    )
}

export default WishList

export const getServerSideProps: GetServerSideProps<wishlistProps | pageNotFound> = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions)
    try{
        await db()
        let wishlist = await wishlists.find({
            userEmail: session?.user?.email
        }, 'tour').populate('tour')
        wishlist = wishlist.map(item => item.tour)
        return {
            props: {
                wishlist: JSON.parse(JSON.stringify(wishlist))
            }
        }
    }catch(e){
        return {
            props: {
                notFound: true
            }
        }
    }
}
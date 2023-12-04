import React from "react"
import Link from "next/link"
import styles from '@/styles/Button.module.scss'
import { buttonProps } from "@/utils/types"

const Button = ({content, bgColor, textColor = 'white', link, onClick, style}: buttonProps) => {

    const btnStyle = {color: textColor, backgroundColor: bgColor}

    if(link){
        return (
            <button className='relative w-full h-[46px] min-w-fit m-4' style={style}>
                <Link className={styles.custom_btn} href={link} style={btnStyle}>
                    {content}
                </Link>
            </button>
        )
    }else{
        return (
            <button className='relative w-full h-[46px] min-w-fit m-4' style={style} onClick={onClick}>
                <div className={styles.custom_btn} style={btnStyle}>
                    {content}
                </div>
            </button>
        )
    }
}

export default Button
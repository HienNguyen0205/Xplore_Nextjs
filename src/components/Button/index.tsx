import React from "react"
import Link from "next/link"
import styles from '../../styles/Button.module.scss'

interface buttonProps {
    content: string,
    bgColor: string,
    textColor?: string,
    link?: string,
    height?: string,
    width?: string,
    onClick?: () => void
}

const Button = ({content, bgColor, textColor = 'white', link, height = '44px', width = '112px', onClick}: buttonProps): JSX.Element => {

    const btnStyle = {color: textColor, backgroundColor: bgColor}

    if(link){
        return (
            <button className='relative' style={{width: width, height: height, margin: '16px'}}>
                <Link className={styles.custom_btn} href={link} style={btnStyle}>
                    {content}
                </Link>
            </button>
        )
    }else{
        return (
            <button className='relative' style={{width: width, height: height, margin: '16px'}} onClick={onClick}>
                <div className={styles.custom_btn} style={btnStyle}>
                    {content}
                </div>
            </button>
        )
    }
}

export default Button
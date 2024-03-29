import React, { useState, useEffect, useRef } from "react"
import Image from "next/image";
import { CldImage } from 'next-cloudinary';
import { carouselProps } from '@/utils/types'
import styles from '@/styles/Carousel.module.scss'

const Carousel = ({content, duration = 6000}: carouselProps) => {

    const [index, setIndex] = useState(0)

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const time = setTimeout(() => {
            nextSlide()
        }, duration)
        return () => clearTimeout(time)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index])

    useEffect(() => {
        ref.current?.scrollTo({
            left: index * screen.width,
            behavior: 'smooth'
        })
    }, [index])

    const prevSlide = () => {
        if(index === 0){
            setIndex(content.length - 1)
        }else{
            setIndex(prev => prev - 1)
        }
    }

    const nextSlide = () => {
        if(index === content.length - 1){
            setIndex(0)
        }else{
            setIndex(prev => prev + 1)
        }
    }

    return (
        <div className="relative w-full h-screen bg-black z-0 overflow-x-hidden">
            <div className={`${styles.carousel_arrow} ${styles.arrow_left}`} onClick={prevSlide}>
                <Image src={require('@/assets/images/Icon/arrow-prev.svg')} alt="arrow-left" height={24} width={24}/>
            </div>
            <div className={`${styles.carousel_arrow} ${styles.arrow_right}`} onClick={nextSlide}>
                <Image src={require('@/assets/images/Icon/arrow-next.svg')} alt="arrow-right" height={24} width={24}/>
            </div>
            <div id={styles.carousel} ref={ref}>
                {content.map((item, imgIndex) => (
                    <div key={imgIndex} className={styles.carousel_item}>
                        <CldImage className='select-none' fill src={item.source} alt='carousel_img' priority/>
                        <div className='absolute bottom-8 w-full flex flex-col items-center'>
                            <h1 id={`${index === imgIndex ? styles.carousel_heading1 : ''}`} className={styles.carousel_heading1}>{item.country}</h1>
                            <h2 id={`${index === imgIndex ? styles.carousel_heading2 : ''}`} className={styles.carousel_heading2}>{item.destination}</h2>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default Carousel
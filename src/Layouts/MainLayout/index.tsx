import React, { ReactNode, useRef } from "react";
import { Header, Footer } from '../../components'


const MainLayout = (props: {children: ReactNode}): JSX.Element => {

    const outterRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={outterRef} className="relative">
            <Header outterRef={outterRef}/>
            <div className="w-full">
                {props.children}
            </div>
            <Footer/>
        </div>
    )
}

export default MainLayout
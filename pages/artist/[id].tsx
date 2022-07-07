import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import s from "./index.module.scss"
import { Logo, Text, ImagesPreview } from '@components'

const data = {

}

const Artist: React.FC = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <section className={s.artist}>
                <Logo to="/" />
                <ImagesPreview
                    primaryImage="https://iili.io/FhDd9R.jpg"
                    secondaryImages={[
                        'https://iili.io/A7NDAP.jpg',
                        'https://iili.io/dwagF2.png',
                        'https://iili.io/hy8bLv.jpg'
                    ]}
                />
                <Text tag="h2" typo="heading-md">Voila le titre de l'exposition que je visite</Text>
                <div className={s.description}>
                    <Text tag="p" typo="paragraph-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquet dictumst sed aliquet nulla sed. Arcu at sagittis a placerat. Aenean cum ut dolor platea diam. Aliquam mi ac dictum tempor eget dictum tristique imperdiet. Tristique consectetur vitae mi amet, adipiscing quis vitae ac. Nunc sit eu elementum cursus. Sagittis lectus eu turpis et adipiscing tempor quis id egestas. Ac mi nibh at interdum id turpis. Interdum sapien purus quis id varius molestie tristique sed.</Text>
                    <div className={s.description__name}>
                        <Text tag="p" typo="paragraph-md">Fabien Deneau</Text>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Artist
import React, { useState, useEffect } from "react"
import style from "./index.module.scss"
import cn from "classnames"
import { TemplatePage, HeadingStrong, Checkbox, Icon, Text, Search, CardGallery } from "@components"
import { useScrollDirection } from "../../src/hooks/useScrollDirection"
import { makeCaseAndAccentInsensitiveString } from "../../src/utility"

enum scrollDirType  {
    up = "up",
    down = "down"
}

interface Work {
    id: string,
    title: string,
    description: string,
    created_at: string
}

const data = [
    {
        "id": "1",
        "title": "Ma mère, musicienne, est morte de maladie maligne à minuit, mardi à mercredi, au milieu du mois de mai mille977 au mouroir memor",
        "description": "Une description",
        "created_at": "2022-06-30T23:09:10.693Z",
    },
    {
        "id": "2",
        "title": "Un titr",
        "description": "Une description",
        "created_at": "2022-06-30T23:09:10.693Z",
    },
    {
        "id": "3",
        "title": "Un ttre",
        "description": "Une description",
        "created_at": "2022-06-30T23:09:10.693Z",
    },
    {
        "id": "4",
        "title": "Un titre",
        "description": "Une description",
        "created_at": "2022-06-30T23:09:10.693Z",
    },
]

const Works: React.FC = () => {

    const [works, setWorks] = useState<Work[]>([])
    console.log(works)

    const [filterExposed, setFilterExposed] = useState<boolean>(false)
    const [filterUnexposed, setFilterUnexposed] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>("")
    const [searchList, setSearchList] = useState<Work[]>([])

    const [direction, setDirection] = useState<scrollDirType.up | scrollDirType.down>()
    const scrollDirection = useScrollDirection()


    const onChangeCheckbox = (event) => {
        
        if(event.target.name === "works-exposed") {
            setFilterExposed(prev => !prev)
            filterUnexposed && setFilterUnexposed(false)
        }

        if(event.target.name === "works-unexposed") {
            setFilterUnexposed(prev => !prev)
            filterExposed && setFilterExposed(false)
        }
    }

    const handleSearch = (event) => {
        let normalizedValue = makeCaseAndAccentInsensitiveString(event.target.value)
        setSearchValue(normalizedValue)
    }
    
    const searchProcess = (value: string) => {
        let search =  works.filter(work => {
            let normalizedTitle = makeCaseAndAccentInsensitiveString(work.title)
            return normalizedTitle.includes(searchValue)
        })

        return search
    }

    /* Init works */
    useEffect(() => {
        setWorks(data)
        setSearchList(data)
    }, [])
    
    /* Search process */
    useEffect(() => {
        console.log("ici")
        if(searchValue) {
            console.log("oui")
            let newSearchList = searchProcess(searchValue)
            setSearchList(newSearchList)
        } else {
            setSearchList(works)
        }
    }, [searchValue, works])

    /* Scroll Event */
    useEffect(() => {
        scrollDirection === "down" ?
            setDirection(scrollDirType.down)
            :
            setDirection(scrollDirType.up)
    }, [scrollDirection])


    return (
        <TemplatePage isLogged={true}>
            <section className={cn(style.headSection, direction === scrollDirType.down ? style.scrollDown : null)}>
                <HeadingStrong content="Mes oeuvres" elementColor="pink" size="xl" />
                <aside className={style.searchBox}>
                    <ul className={style.filters}>
                        <li>
                            <Checkbox 
                                checkboxLabel="Exposées"
                                checkboxName="works-exposed"
                                isChecked={filterExposed}
                                onChange={onChangeCheckbox}
                            />
                        </li>
                        <li>
                            <Checkbox 
                                checkboxLabel="Non exposées"
                                checkboxName="works-unexposed"
                                isChecked={filterUnexposed}
                                onChange={onChangeCheckbox}
                            />
                        </li>
                        <li className={style.date}>
                            <Icon type="downArrow" size="small" color="black" />
                            <Text tag="p" typo="label">Date de création</Text>
                        </li>
                    </ul>
                    <Search 
                        id="works-search" 
                        placeholder="Rechercher une oeuvre par son titre" 
                        value={searchValue} 
                        onChange={handleSearch}
                    />
                </aside>
            </section>
            <section className={style.bodySection}>
                {searchList.map((work) => (
                    <CardGallery key={work.id} title={work.title} createdAt={work.created_at}/>
                ))}
            </section>
        </TemplatePage>
    )
}

export default Works;
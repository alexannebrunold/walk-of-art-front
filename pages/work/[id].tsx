import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { isLoggedIn } from "axios-jwt"
import style from "./index.module.scss"
import { useSetRecoilState } from "recoil"
import {
  activeModalState,
  CONFIRM_WORK_DELETE_MODAL_ID,
} from "@recoil/modal/atom"
import cn from "classnames"
import {
  TemplatePage,
  Text,
  ImagesPreview,
  Button,
  Icon,
  Unauthorized,
  ButtonArrow
} from "@components"
import cardImg from "../../src/assets/images/cardImg.png"
import { getDateWithoutHours, windowIsNotReady } from "../../src/utility"


interface Work {
  id: string
  title: string
  description: string
  created_at: string
  exhibitions?: AttachedExhib[]
}

interface AttachedExhib {
  title: string
  status: string
}

const data: Work = {
  id: "1",
  title:
    "Ma mère, musicienne, est morte de maladie maligne à minuit, mardi à mercredi, au milieu du mois de mai mille977 au mouroir memor",
  description: "Une description",
  created_at: "2022-06-27T23:09:10.693Z",
  exhibitions: [
    {
      title: "Titre de l'exhibition",
      status: "validate",
    },
    {
      title: "Titre de l'exhibition 2",
      status: "pending",
    },
  ],
}

const Works: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const setActiveModal = useSetRecoilState(activeModalState)

  const [work, setWork] = useState<Work>({
    id: "",
    title: "",
    description: "",
    created_at: "",
    exhibitions: [],
  })

  const openModal = () => {
    setActiveModal(CONFIRM_WORK_DELETE_MODAL_ID)
  }

  /* Init work */
  useEffect(() => {
    setWork(data)
  }, [])

  return (
    <TemplatePage>
      {isLoggedIn() ? (
        <>
          <span className={style.backLink}>
            <ButtonArrow label="Retour à la liste des oeuvres" to="/works"/>
          </span>
          <section className={style.mainSection}>
            <ImagesPreview
              primaryImage={cardImg.src}
              secondaryImages={[cardImg.src, cardImg.src]}
            />
            <Text tag="h1" typo="heading-lg">
              {work.title}
            </Text>
            <Text tag="p" typo="paragraph-md">
              {work.description}
            </Text>
            <span className={style.date}>{`Créée le ${getDateWithoutHours(
              work.created_at
            )}`}</span>

        <button className={style.exhibButton} onClick={() => console.log("ok")}>
          Créer une exposition avec cette oeuvre
        </button>

            <div className={style.actionsWrapper}>
              <Button
                label="Modifier l'oeuvre"
                bg="light"
                color="black"
                onClick={() => console.log("modifier")}
              />
              <Button
                label="Supprimer l'oeuvre"
                bg="dark"
                onClick={openModal}
              />
            </div>
          </section>
        </>
      ) : (
        <Unauthorized />
      )}
    </TemplatePage>
  )
}

export default Works

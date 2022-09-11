import React, { useEffect, useState } from "react";
import styles from "./formFour.module.scss";
import { Button, ExpositionBoard, Tooltip } from "@components";
import cardImg from "../../../../assets/images/cardImg.png"
import { useForm } from "react-hook-form";
import { axiosInstance, getDateWithoutHours } from "@utility/index";
import { BASE_API_URL } from "@const/index"
import e from "express";
import axios from "axios";

const toolTipText = "Veuillez vérifier miniteusement les informations concernant votre exposition car aucune modification ne sera possible par la suite."

export interface IProps {
  handleStepSubmit: (data: any) => void;
  handleBack: () => void;
  onClick: (any) => void;
  defaultValues?: any;
  formState: any;
}

export interface IRecapProps {
  handleStepSubmit: (data: any) => void;
  handleBack: () => void;
}


export const FormFour: React.FC<IProps> = ({ handleBack, handleStepSubmit, defaultValues = {}, formState }: IProps) => {
  const [orientation, setOrientation] = useState<string>('portrait')
  const [form, setForm] = useState<any>()

  // const {
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({ mode: "onBlur", defaultValues });

  // const onSubmit = (event: any) => {
  //   event.preventDefault();

  //   handleSubmit(() => {
  //     createExhibition(formState);
  //   })(event);
  // };

  const setWorkOrientationFromForm = () => {
    
    setOrientation(formState.orientation)
  }

  const setX = () => {
    setForm(formState)
  }

  useEffect(() => {
    setWorkOrientationFromForm()
    setX()
  }, [formState])

  const createExhibition = (event) => {
    event.preventDefault()

      const expectedBodyForExhibition = {
        "title": form.title,
        "description": form.description,
        "dateStart": form.startExpositionDate,
        "dateEnd": form.endExpositionDate,
        "comment": form.isVisitorsCommentsAuthorized,
        "work": '/api/works/' + form.selectedWorkId,
        "snapshot": [
          {
            "name": "facebook",
            "url": form.facebook
          },
          {
            "name": "tipeee",
            "url": form.personnalWebsite
          }
        ],
        "orientation": form.workOrientation,
        "gallery": '1ed31e80-76d6-6194-bf74-0f2e9dc8d72b'
      }

      return axiosInstance.post(`https://walk-of-dev.herokuapp.com/api/exhibitions`, expectedBodyForExhibition)
        .then(response => {
  
          return response.data
        }).catch((error) => {
          return error
        })
  }

  return (
    <>
      <div className={styles.toolTip}>
        <Tooltip text={toolTipText} icon="info" type="info" />
      </div>

      <form className={styles.formContainer} >
        <div className={orientation === 'portrait' ? styles.portrait : ''}>
          <ExpositionBoard src={cardImg} alt={""} orientation={orientation} />
        </div>
        <div className={styles.alignLeft}>
          <h1 className={styles.title}>{formState.title}</h1>
          <p className={styles.description}>{formState.description}</p>
          <ul className={styles.list}>
            <li>
              <strong className={styles.bold}>
                Votre profil facebook :
              </strong>
              {formState.facebookUrl}
            </li>
            <li>
              <strong className={styles.bold}>
                Votre site personnel :
              </strong>
              {formState.personnalWebsiteUrl}
            </li>
          </ul>

          {/* <p className={styles.marginTop40}>
            Votre exposition à lieu à
            <strong className={styles.bold}>VILLE</strong>
            dans la gallerie n°<strong className={styles.bold}>NUMBER</strong>
            située à <strong className={styles.bold}>ADRESSE</strong>
          </p> */}

          <p className={styles.marginTop16}>
            Votre exposition aura lieu du
            <strong className={styles.bold}> {getDateWithoutHours(formState.startExpositionDate)} </strong>
            au <strong className={styles.bold}> {getDateWithoutHours(formState.endExpositionDate)}</strong>
          </p>

          <div className={styles.ctaContainer}>
            <Button label={"Étape précédente"} color="black" bg="light" type="submit" onClick={handleBack} />
            <button onClick={createExhibition}>cc</button>
            {/* <Button label={"Passer au paiement"} color="white" bg="dark" type="submit" /> */}
          </div>
        </div>

      </form>
    </>
  )
}

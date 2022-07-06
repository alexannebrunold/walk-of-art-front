import React from 'react';
import { isLoggedIn } from 'axios-jwt'
import { TemplatePage, HeadingStrong, ExhibitionStepper, Link, Input, Artwork, Unauthorized  } from "@components"
import { IStep } from "../../src/components/stepper"
import styles from './index.module.scss'
import Image from '../../src/assets/images/artwork.png'
import { windowIsNotReady } from '../../src/utility'
const STEPS = [
    {
        id: 1,
        label: "Step 1",
        number: 1,
        completed: false,
    },
    {
        id: 2,
        label: "Step 2",
        number: 2,
        completed: false,
    },
    {
        id: 3,
        label: "Step 3",
        number: 3,
        completed: false,
    },
    
]


const CreateExhibition: React.FC = () => {
    const [activeStep, setActiveStep] = React.useState<number>(0)
    const [steps, setSteps] = React.useState<IStep[]>(STEPS)
    const completeStep = (index: number) => {
        setSteps(steps.map((step, i) => {
            if (i === index) {
                return {
                    ...step,
                    completed: true,
                }
            }
            return step
        }))
    }

    if(windowIsNotReady()) {
        return null
    }

    return (
        <TemplatePage>
            {isLoggedIn() ? 
                <>
                    <Link to='/' label='Retour à la connexion' classname={styles.link}/>
                    <div className={styles.background}></div>
                    <div className={styles.heading}>
                        <HeadingStrong elementColor="success" color="black" content="Création d'une oeuvre" size="md" /> 
                        {/* <Artwork src={Image} alt={"test"} size={"small"}/>  */}
                    </div>
                    {/* <ExhibitionStepper activeStep={activeStep} steps={steps} completeOne={completeStep} setActiveStep={setActiveStep}/> */}
                </>
                :
                <Unauthorized />
            }
        </TemplatePage>
    )
}

export default CreateExhibition
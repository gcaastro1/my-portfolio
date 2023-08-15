import { JobData } from "@/utils/jobsData"
import styles from "./style.module.scss"
import Image from "next/image"

interface Props {
    job: JobData
}

const Card = ({ job }: Props) => {  
    return (
        <label className={styles.carousel__card} htmlFor={`job-${job.id}`} id={`card-${job.id}`}>
            <div className={``}>
                <Image src={job.img} alt="Job Cover Image"/>
            </div>
        </label>
    )
}

export default Card

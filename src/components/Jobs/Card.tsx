import { JobData } from "@/utils/jobsData"
import styles from "./style.module.scss"
import Image from "next/image"

interface Props {
    job: JobData
}

const Card = ({ job }: Props) => {  
    return (
        <div className={`${styles.card} background`}>
            <div className={styles.card__info}>
                <div className={styles.card__info__stacks}>
                    { job.stacks.map((stack) => (
                            <span key={stack} className={`stack`}>{stack}</span>)
                        )
                    } 
                </div>                              
                <h2 className={`${styles.card__info__title} text`}>{job.title}</h2>
                <p className={`${styles.card__info__description} text`}>{job.description}</p>
                <a href={job.repo} className={`${styles.card__info__link} stack`}>Repositorio</a>
                { job.repo2 ? <a href={job.repo} className={`${styles.card__info__link} stack`}>Repositorio Back</a> : null}
                <a href={job.deploy} className={`${styles.card__info__link} stack`}>Deploy</a>
            </div>
            
            <div className={styles.card__cover}>
                <Image src={job.img} alt="Job Cover Image"/>
            </div>
        </div>
    )
}

export default Card

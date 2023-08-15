import Card from "./Card"
import styles from "./style.module.scss"
import jobs from "@/utils/jobsData"


const Carousel = () => {  
    return (
        <div className={styles.carousel}>
            {
                jobs.map((job) => (<input key={`job-${job.id}`} className={styles.carousel__radio} type="radio" name="slider" id={`job-${job.id}`} defaultChecked={job.id === 1} />))
            }
            <div className={styles.carousel__list}>
                {
                    jobs.map((job) => <Card key={`card-${job.id}`} job={job}/>)         
                }
            </div>
        </div>
    )
}

export default Carousel

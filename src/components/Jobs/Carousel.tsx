import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination } from "swiper/modules"

import styles from "./style.module.scss"
import jobs from "@/utils/jobsData"
import Card from "./Card"

import "swiper/scss"
import "swiper/scss/navigation"
import "swiper/scss/pagination"
import "swiper/scss/autoplay"

const Carousel = () => {  
    return (
        <div className={styles.carousel}>
            <Swiper
                loop  
                allowTouchMove={false}
                slidesPerView={1} 
                centeredSlides
                direction={"vertical"}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000,
                    pauseOnMouseEnter: true,
                }}
                className={styles.carousel} 
                modules={[Navigation, Autoplay, Pagination]}
                > 
                {
                    jobs.map((job) => (
                        <SwiperSlide key={`card-${job.id}`}> 
                            <Card job={job}/>
                        </SwiperSlide>
                        )
                    )         
                }
            </Swiper>
        </div>
        
    )
}

export default Carousel

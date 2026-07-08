'use client'

import SectionHeading from '@/components/SectionHeading'
import { LanguageContext } from '@/contexts/LanguageContext'
import projectsData from '@/utils/projectsData'
import { translations } from '@/utils/i18n'
import { useContext, useCallback, useEffect, useState } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import useEmblaCarousel from 'embla-carousel-react'
import ProjectCard from './Card'
import styles from './style.module.scss'

const Projects = () => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].projects
  const visibleProjects = projectsData.filter((project) => project.visible)

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false })
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className={`${styles.projects} section`} id="projects">
      <div className="container">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className={styles.carouselWrapper}>
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.embla__container}>
              {visibleProjects.map((project) => (
                <div className={styles.embla__slide} key={project.id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.controls}>
            <button
              className={styles.controls__button}
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              aria-label="Previous project"
            >
              <CaretLeft size={24} weight="bold" />
            </button>
            <button
              className={styles.controls__button}
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              aria-label="Next project"
            >
              <CaretRight size={24} weight="bold" />
            </button>
          </div>
        </div>

        <p className={styles.projects__note}>
          {copy.nextLab}
        </p>
      </div>
    </section>
  )
}

export default Projects

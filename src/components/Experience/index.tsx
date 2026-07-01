import experienceData from '@/utils/experienceData'
import styles from './style.module.scss'

const Experience = () => {
  return (
    <section className={styles.experience} id="experience">
      <div className={`${styles.experience__container} container`}>
        <h2 className={styles.experience__title}>Experience.</h2>
        <div className={styles.experience__timeline}>
          {experienceData.map((experience) => (
            <article
              className={styles.experience__item}
              key={`${experience.company}-${experience.period}`}
            >
              <div className={styles.experience__heading}>
                <div>
                  <h3>{experience.company}</h3>
                  <p>{experience.role}</p>
                </div>
                <time>{experience.period}</time>
              </div>
              <ul>
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

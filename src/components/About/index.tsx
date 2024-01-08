import stackData from '@/utils/stackData'
import styles from './style.module.scss'
import Stack from './Stack'

const About = () => {
  const stacks = stackData

  return (
    <section className={styles.about} id='about'>
      <div className={`${styles.about__container} container`}>
        <div className={styles.about__content}>
          <h1 className={styles.about__content__title}>About.</h1>
          <p className={styles.about__content__text}>
            Passionate about art and innovation, always looking for new
            knowledge. I worked for 4 years in the area of digital product
            design. I&apos;m always looking to improve my skills and knowledge
            to create better experiences for users. And I&apos;m currently
            specializing in web development.
            <br />
            <br />
            Discover here in this environment, created especially for you, all
            my projects and technologies.
          </p>
        </div>
        <ul className={styles.about__stacks}>
          {stacks.map((stack) => (
            <Stack key={stack.title} title={stack.title} icon={stack.img} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About

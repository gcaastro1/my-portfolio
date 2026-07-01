import stackData from '@/utils/stackData'
import styles from './style.module.scss'
import Stack from './Stack'

const About = () => {
  const stacks = stackData

  return (
    <section className={styles.about} id="about">
      <div className={`${styles.about__container} container`}>
        <div className={styles.about__content}>
          <h1 className={styles.about__content__title}>About.</h1>
          <p className={styles.about__content__text}>
            I am a Front-End Developer with experience building and maintaining
            web applications and business systems using React.js, Next.js,
            TypeScript and Delphi/VCL.
            <br />
            <br />
            My background combines UI/UX design, modern front-end development
            and experience with ERP systems, SQL routines, reports, filters and
            business rules. I enjoy transforming complex workflows into clear,
            reliable and user-friendly interfaces.
            <br />
            <br />
            Currently, I work on the modernization and maintenance of corporate
            systems, improving usability, performance and stability in
            applications used by real business users.
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

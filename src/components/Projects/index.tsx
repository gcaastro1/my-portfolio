import SectionHeading from '@/components/SectionHeading'
import projectsData from '@/utils/projectsData'
import ProjectCard from './Card'
import styles from './style.module.scss'

const Projects = () => {
  const visibleProjects = projectsData.filter((project) => project.visible)

  return (
    <section className={`${styles.projects} section`} id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="03 / Selected work"
          title="Projects with a point of view."
          description="A curated selection of interfaces where engineering, usability and business context meet."
        />

        <div className={styles.projects__list}>
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <p className={styles.projects__note}>
          Next in the lab: FinanceFlow, Stockly ERP and HelpDesk Pro.
        </p>
      </div>
    </section>
  )
}

export default Projects

import styles from './style.module.scss'

const ProjectPreview = () => {
  return (
    <div className={styles.preview} aria-label="Portfolio interface preview">
      <div className={styles.preview__browser}>
        <span />
        <span />
        <span />
        <p>gustavolima.dev</p>
      </div>
      <div className={styles.preview__layout}>
        <aside>
          <div className={styles.preview__brand}>GL</div>
          <i />
          <i />
          <i />
          <i />
        </aside>
        <div className={styles.preview__canvas}>
          <p>FRONT-END DEVELOPER</p>
          <h3>
            Interfaces for
            <span>real business.</span>
          </h3>
          <div className={styles.preview__metrics}>
            <article>
              <small>Projects</small>
              <strong>01</strong>
            </article>
            <article>
              <small>Experience</small>
              <strong>6+ yrs</strong>
            </article>
            <article>
              <small>Focus</small>
              <strong>UI/UX</strong>
            </article>
          </div>
          <div className={styles.preview__chart}>
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPreview

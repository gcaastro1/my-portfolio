import { ReactNode } from 'react'

import styles from './style.module.scss'

interface EditorPanelProps {
  filename: string
  lines?: number
  children: ReactNode
}

const EditorPanel = ({ filename, lines = 80, children }: EditorPanelProps) => {
  return (
    <div className={styles.panel}>
      <div className={styles.panel__bar}>
        <span className={styles.panel__dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.panel__file}>{filename}</span>
      </div>

      <div className={styles.panel__body}>
        <span className={styles.panel__gutter} aria-hidden="true">
          {Array.from({ length: lines }, (_, index) => (
            <i key={index}>{index + 1}</i>
          ))}
        </span>
        <div className={styles.panel__content}>{children}</div>
      </div>
    </div>
  )
}

export default EditorPanel

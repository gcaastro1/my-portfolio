import { ScriptProps } from 'next/script'
import { FunctionComponent } from 'react'
import styles from './style.module.scss'

interface StackProps {
  title: string
  icon: any
}

const Stack = ({ title, icon }: StackProps) => {
  const Icon = icon

  return (
    <li className={styles.stack}>
      <p className={styles.stack__title}>{title}</p>
      <span className={styles.stack__icon}>
        <Icon color={'#e6e6e6'} size={'54'} />
      </span>
    </li>
  )
}

export default Stack

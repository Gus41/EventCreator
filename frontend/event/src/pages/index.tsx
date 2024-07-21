import Link from 'next/link'
import styles from '../styles/home.module.css'
export default function Home(){
  return(
    <div className={styles.container}>
      <div className={styles.dcol}>
        <Link href='create/'>Criar Evento</Link>
        <Link href='visualize/'>Visualizar Eventos</Link>
      </div>
    </div>
  )
}
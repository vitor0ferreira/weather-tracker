import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main>
      <form>
        <input 
          type='search'
          placeholder='Digite a cidade'
          required
          className={styles.search_bar}
        />
        <input type='submit'/>
      </form>
    </main>
  )
}

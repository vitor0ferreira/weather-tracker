'use client';

import Image from 'next/image'
import styles from './page.module.css'
import { Children, useState } from 'react'


export default function Home() {

  const [currentCity, setCurrentCity] = useState<string>();

  const handleChange = (e:any) => {
    setCurrentCity(e.target.value);
    console.log(currentCity);
  };

  const formSubmit = () => {
    console.log(currentCity);
  };
  
  return (
    <main>
      <form className={styles.form}>
        <input 
          type='search'
          placeholder='Digite a cidade'
          required
          className={styles.search_bar}
          onChange={handleChange}
        />
        <button className={styles.submit} onClick={formSubmit}>
          PROCURAR
        </button>
      </form>
      <section className={styles.weather_section}>
        
      </section>
    </main>
  )
}

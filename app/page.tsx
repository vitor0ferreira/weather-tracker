'use client';

import Image from 'next/image'
import styles from './page.module.css'
import { Children, useState } from 'react'


export default function Home() {

  const [searchCity, setSearchCity] = useState<string>('');
  const [currentCity, setCurrentCity] = useState<string>('');
  const cardWeather:any = document.getElementById('weather_card');

  const handleChange = (e:any) => {
    setSearchCity(e.target.value);
    console.log(searchCity);
  };

  const citySubmit = () => {
    cardWeather.innerText = searchCity;
    console.log(searchCity);
  };

  
  return (
    <main>
      <div className={styles.div}>
        <input 
          type='search'
          placeholder='Digite a cidade'
          required
          className={styles.search_bar}
          onChange={handleChange}
        />
        <button className={styles.submit} onClick={citySubmit}>
          PROCURAR
        </button>
      </div>
      <section className={styles.weather_section} id='weather_card'>
        
      </section>
    </main>
  )
}

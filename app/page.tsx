'use client';

import { BsFillGeoAltFill } from 'react-icons/bs'
import styles from './page.module.css'
import { Children, useEffect, useState } from 'react'


export default function Home() {

  interface Cidade {
    latitude: number,
    longitude: number
  };

  const [searchCity, setSearchCity] = useState<string>('New York');
  const [cityCoordinates, setCityCoordinates] = useState<Cidade>();
  const cardWeather:HTMLElement | null = document.getElementById('weather_card');
  const geoApiURL:string = 'http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid={9db20493ccc761d551a7b7e55deaa7c2}';

  const citySubmit = () => {
    console.log(searchCity);
  };

  useEffect(()=>{
    const getCoordinates = async () => {
      
      const geoLocationCall = await fetch(geoApiURL);
      const locationData = await geoLocationCall.json();






    };

  },[]);

  
  return (
    <main>
      <div className={styles.div}>
        <input 
          type='search'
          placeholder='Digite a cidade'
          required
          className={styles.search_bar}
          onChange={(e)=>{setSearchCity(e.target.value)}}
        />
        <button className={styles.submit} onClick={citySubmit}>
          PROCURAR
        </button>
      </div>
      <section className={styles.weather_section} id='weather_card'>
        {searchCity ? <div><BsFillGeoAltFill/> {searchCity}</div> : null}
      </section>
    </main>
  )
}

'use client';

import { BsFillGeoAltFill } from 'react-icons/bs'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import Card from './components/Card/Card';

interface City {
  name: string,
  longitude: number,
  latitude: number,
  temperature: number,
  humidity: number,
}

export default function Home() {
  
  const [cityInput, setCityInput] = useState<string>('New York')
  const [isDataReady, setIsDataReady] = useState<boolean>(false)
  const cityData:City = {
    name: cityInput,
    longitude: 0,
    latitude: 0,
    temperature: 0,
    humidity: 0
  }

  
  async function GetWeatherData (){
    const geoApiURL:string = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=9db20493ccc761d551a7b7e55deaa7c2`;
    
    
    const fetchData = await fetch(geoApiURL)
      .then((data)=>data.json())
      .then((data)=> data = data[0])
      .then((data)=>{
        console.log(data)
        cityData.latitude = data.lat
        cityData.longitude = data.lon
        console.table(cityData)
      })
      .then(() => fetchWeather(cityData))

    async function fetchWeather(city:City){

      const weatherApiURL:string = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude=daily&units=metric&appid=9db20493ccc761d551a7b7e55deaa7c2`;

      await fetch(weatherApiURL)
      .then((response)=>response.json())
      .then((response)=>{
        console.log(response)
        cityData.temperature = response.current.temp
        cityData.humidity = response.current.humidity
        setIsDataReady(true);
      })
    }
  }

  return (
    <main>
      <div className={styles.div}>
        <input 
          type='search'
          placeholder='Digite a cidade'
          required
          className={styles.search_bar}
        />
        <button className={styles.submit} onClick={GetWeatherData}>
          PROCURAR
        </button>
      </div>
      {isDataReady && <Card city={isDataReady && cityData}/>}
    </main>
  )
}

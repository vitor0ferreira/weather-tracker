'use client';

import { BsFillGeoAltFill } from 'react-icons/bs'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import Card from './components/Card/Card';

interface City {
  name: string | undefined | null,
  longitude: number,
  latitude: number,
  temperature: number,
  humidity: number,
}

export default function Home() {

  const [cityData, setCityData] = useState<City>({
    name: 'New York',
    longitude: 0,
    latitude: 0,
    temperature: 0,
    humidity: 0
  })

  const searchedCity = document.querySelector('input')?.value
  

  function handleSearchClick (){
      GetWeatherData();
  }
  
  async function GetWeatherData (){
    const geoApiURL:string = `http://api.openweathermap.org/geo/1.0/direct?q=${cityData.name}&limit=5&appid=9db20493ccc761d551a7b7e55deaa7c2`;
    
    
    const fetchData = await fetch(geoApiURL)
    const weatherData = await fetchData.json()
      .then((data)=>{
        data = data[0]
        setCityData({...cityData, latitude: data.lat, longitude: data.lon})   
      })
      .then(() => fetchWeather(cityData))

    async function fetchWeather(city:City){

      const weatherApiURL:string = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude=daily&units=metric&appid=9db20493ccc761d551a7b7e55deaa7c2`;

      await fetch(weatherApiURL)
      .then((response)=>response.json())
      .then((response)=>{
        setCityData({...cityData, temperature: response.current.temp, humidity: response.current.humidity})
        console.table(cityData)
      })
    }
  }

  return (
    <main>
      <div >
        <input 
          type='search'
          placeholder='Digite a cidade'
          required
          className={styles.search_bar}
          id='searchInput'
        />
        <button onClick={handleSearchClick}>
          PROCURAR
        </button>
      </div>
      <div >
        <h1>{cityData.name}</h1>
        <section >Temperatura <p>{cityData.temperature}</p> </section>
        <section >Umidade <p>{cityData.humidity}</p> </section>
      </div>
    </main>
  )
}

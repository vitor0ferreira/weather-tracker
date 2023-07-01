'use client';

import { BsFillGeoAltFill } from 'react-icons/bs'
import styles from './page.module.css'
import { Children, useEffect, useState } from 'react'
import Card from './components/Card/Card';


export default function Home() {


  const [searchCity, setSearchCity] = useState<string>('New York');
  const encodeCity = encodeURI(searchCity);
  const [cityCoordinates, setCityCoordinates] = useState<any>();
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<any>([]);
  const geoApiURL:string = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeCity}&limit=5&appid=9db20493ccc761d551a7b7e55deaa7c2`;
  const weatherApiURL:string = `https://api.openweathermap.org/data/3.0/onecall?lat=${cityCoordinates?.latitude}&lon=${cityCoordinates?.longitude}&exclude=daily&units=metric&appid=9db20493ccc761d551a7b7e55deaa7c2`

  async function getCoordinates() {
    try {
      const geoLocationCall = await fetch(geoApiURL);
      try {
        const locationData = await geoLocationCall.json();
        const { lat, lon} = locationData[0];
        const cityFinded = {latitude: lat, longitude: lon};

        setCityCoordinates(cityFinded);
        if(cityFinded.latitude && cityFinded.longitude)
        {
          console.log(cityFinded)
          console.log(cityCoordinates)
        }
      } catch (error) {
      alert(error);
      }
    } catch (error) {
      alert(error);
    }
  };

  async function getWeather() {
    try {
      const cityWeatherCall = await fetch(weatherApiURL)
      const cityWeather = await cityWeatherCall.json();
      
      setWeatherData(cityWeather);
      setIsSearching(false);
      setIsReady(true);
    } catch (error) {
      alert(error);
    }
    
  };


  useEffect(()=>{

    if(isSearching)
      getCoordinates();
    
  },[isSearching]);

  const handleClick = () => {
    setIsSearching(true);
    setIsReady(false);
  }

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
        <button className={styles.submit} onClick={handleClick}>
          PROCURAR
        </button>
      </div>
      { isReady ?
        (<Card city={searchCity} weather={weatherData} />)
        : null
      }
    </main>
  )
}

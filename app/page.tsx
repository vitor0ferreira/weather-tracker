'use client';

import { BsFillGeoAltFill } from 'react-icons/bs'
import styles from './page.module.css'
import { Children, useEffect, useState } from 'react'
import Card from './components/Card/Card';


export default function Home() {

  interface Cidade {
    latitude: number,
    longitude: number
  };

  const [searchCity, setSearchCity] = useState<string>('New York');
  const [cityCoordinates, setCityCoordinates] = useState<Cidade>();
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<any>([]);
  const geoApiURL:string = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=9db20493ccc761d551a7b7e55deaa7c2`;
  const weatherApiURL:string = `https://api.openweathermap.org/data/3.0/onecall?lat=${cityCoordinates?.latitude.toFixed(1)}&lon=${cityCoordinates?.longitude.toFixed(1)}&exclude=daily&units=metric&appid=9db20493ccc761d551a7b7e55deaa7c2`

  const citySubmit = () => {
    console.log(searchCity);
  };

  async function getCoordinates() {

    const geoLocationCall = await fetch(geoApiURL)
    const locationData = await geoLocationCall.json()
      .then((res)=>{

        const cidadeEncontrada:Cidade = {
          latitude: res[0].lat,
          longitude: res[0].lon
        };
        setCityCoordinates(cidadeEncontrada);
        getWeather();
      })
  };

  async function getWeather() {
    
    const cityWeatherCall = await fetch(weatherApiURL)
      .then((res)=>res.json())
      .then((data)=>{
        setWeatherData(data);
        setIsSearching(false);
        setIsReady(true);
      });
    
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
        <Card city={searchCity} temperature={weatherData.current.temp} humidity={weatherData.current.humidity} />
        : null
      }
    </main>
  )
}

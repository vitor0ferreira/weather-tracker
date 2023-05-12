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
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<any>([]);
  const geoApiURL:string = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=9db20493ccc761d551a7b7e55deaa7c2`;
  const weatherApiURL:string = `https://api.openweathermap.org/data/3.0/onecall?lat=${cityCoordinates?.latitude.toFixed(1)}&lon=${cityCoordinates?.longitude.toFixed(1)}&exclude=daily&appid=9db20493ccc761d551a7b7e55deaa7c2`

  const citySubmit = () => {
    console.log(searchCity);
  };

  async function getCoordinates() {
      
    const geoLocationCall = await fetch(geoApiURL);
    const locationData = await geoLocationCall.json();
    
    const cidadeEncontrada:Cidade = {
      latitude: locationData[0].lat,
      longitude: locationData[0].lon
    };

    setCityCoordinates(cidadeEncontrada);
  };

  async function getWeather() {
    
    const cityWeatherCall = await fetch(weatherApiURL)
      .then((res)=>res.json())
      .then((res)=>setWeatherData(res));
    
    setIsSearching(false);
  };


  useEffect(()=>{

    if(isSearching){
      getCoordinates();
      if(cityCoordinates)
        getWeather();
    };
    
  },[isSearching]);

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
        <button className={styles.submit} onClick={()=>{setIsSearching(true)}}>
          PROCURAR
        </button>
      </div>
      <section className={styles.weather_section} id='weather_card'>
        {searchCity ? <div><BsFillGeoAltFill/> {searchCity}</div> : null}
        {!isSearching ? <div>Temp: {weatherData.current.temp} C° Umidade: {weatherData.current.umity}</div> : null}
      </section>
    </main>
  )
}

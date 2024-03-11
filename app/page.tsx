'use client';

import { FaSearch } from "react-icons/fa";
import { useState } from 'react'
import Card from './components/Card/Card';
import LoadingSpinner from "./components/LoadingSpinner";

interface City {
  name: string | undefined | null,
  temperature?: number,
  humidity?: number,
  feels_like?: number,
  weather_desc: Array<object>,
}

export default function Home() {
  
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchedCity, setSearchedCity] = useState('')
  const [cityData, setCityData] = useState<City>({
    name: '',
    temperature: 0,
    humidity: 0,
    feels_like: 0,
    weather_desc: []
  })


  function handleSearchClick (){
    setIsLoading(true)
    if(searchedCity != ''){
      GetWeatherData(searchedCity)
    }
    if(searchedCity.length < 3){
      alert('Nome inválido ou não encontrado.')
    }
  }
  
  async function GetWeatherData (city:string){
    const geoApiURL:string = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=9db20493ccc761d551a7b7e55deaa7c2`;
    const fetchData = await fetch(geoApiURL)
    const data = await fetchData.json()

    async function fetchWeather([latitude, longitude]:Array<number>){

      const weatherApiURL:string = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=daily&units=metric&appid=9db20493ccc761d551a7b7e55deaa7c2`;

      const weatherData = await fetch(weatherApiURL)
      const weather = await weatherData.json()
      console.table(weather.current)
      setCityData({
        name: city,
        temperature: weather.current.temp,
        humidity: weather.current.humidity,
        feels_like: weather.current.feels_like,
        weather_desc: weather.current.weather
      })
    }
    fetchWeather([data[0].lat, data[0].lon])
    setIsLoading(false)
  }

  return (
    <main className='bg-weatherPixelArt h-screen min-h-min w-full bg-center bg-cover flex flex-col items-center justify-center gap-6'>
      <div className='bg-slate-700 rounded-sm flex flex-col gap-2 p-2  shadow-sm shadow-black'>
        <p className="text-white font-semibold text-center" >Pesquise o nome da cidade</p>
        <div className="flex gap-2">
          <input
            type='search'
            placeholder='Digite a cidade'
            required
            className='p-1 h-6 text-sm font-semibold focus:outline-none rounded-sm focus:placeholder:invisible'
            onChange={(e)=> setSearchedCity(e.target.value)}
            id='searchInput'
          />
          <button onClick={handleSearchClick} className='text-white'>
            <FaSearch/>
          </button>
        </div>
      </div>
      {isLoading && <LoadingSpinner/>}
      {cityData.temperature != 0 && <Card city={cityData} />}
    </main>
  )
}

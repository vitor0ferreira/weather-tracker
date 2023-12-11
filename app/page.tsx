'use client';

import { BsFillGeoAltFill } from 'react-icons/bs'
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

  const [cards, setCards] = useState<any>([])
  const [cityData, setCityData] = useState<City>({
    name: 'New York',
    longitude: 0,
    latitude: 0,
    temperature: 0,
    humidity: 0
  })

  const [searchedCity, setSearchedCity] = useState('')

  function handleSearchClick (){
    if(cards.length == 10){
      cards.shift();
    }
    if(searchedCity != ''){
      setCards((prevCards:Array<string>)=> [...prevCards, searchedCity])
    }
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
    <main className='bg-weatherPixelArt h-screen min-h-min w-full bg-center bg-cover flex flex-col items-center justify-center gap-6'>
      <div className='bg-slate-700 rounded-sm flex gap-2 p-2 shadow-sm shadow-black'>
        <input 
          type='search'
          placeholder='Digite a cidade'
          required
          className='p-1 h-6 text-sm font-semibold focus:outline-none rounded-sm focus:placeholder:invisible'
          onChange={(e)=> setSearchedCity(e.target.value)}
          id='searchInput'
        />
        <button onClick={handleSearchClick} className='font-semibold text-white'>
          PROCURAR
        </button>
      </div>
      <section className='h-min w-screen gap-4 flex flex-wrap p-4 overflow-scroll no-scrollbar'>
        {cards.map((searchedCity:string, index:number) => (
          <Card key={index} index={index+1} cityData={searchedCity} />
        ))}
      </section>
    </main>
  )
}

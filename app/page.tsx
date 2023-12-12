'use client';

import { FaSearch } from "react-icons/fa";
import { useState } from 'react'
import Card from './components/Card/Card';

interface City {
  name: string | undefined | null,
  longitude: number,
  latitude: number,
  temperature: number,
  humidity: number,
}

export default function Home() {
  
  const [searchedCity, setSearchedCity] = useState('')
  const [cards, setCards] = useState<any>([])
  const [cityData, setCityData] = useState<City>({
    name: '',
    longitude: 0,
    latitude: 0,
    temperature: 0,
    humidity: 0
  })


  function handleSearchClick (){
    if(cards.length == 10){
      cards.shift();
    }
    if(searchedCity != ''){
      setCards((prevCards:Array<string>)=> [...prevCards, searchedCity])
      // GetWeatherData(searchedCity)
    }
    if(searchedCity.length < 3){
      alert('Nome inválido ou não encontrado.')
    }
  }
  
  async function GetWeatherData (city:string){
    const geoApiURL:string = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=9db20493ccc761d551a7b7e55deaa7c2`;
    
    
    const fetchData = await fetch(geoApiURL)
    const weatherData = await fetchData.json()
      .then((data)=>{
        setCityData({...cityData, name: searchedCity, latitude: data[0].lat, longitude: data[0].lon})
        console.table(data)
        console.table(cityData)
      })
      .then(() => fetchWeather(cityData))

    async function fetchWeather(city:City){

      const weatherApiURL:string = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude=daily&units=metric&appid=9db20493ccc761d551a7b7e55deaa7c2`;

      await fetch(weatherApiURL)
      .then((response)=>response.json())
      .then((response)=>{
        setCityData({...cityData, temperature: response.current.temp, humidity: response.current.humidity})
      })
    }
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
      <section className='h-min w-screen gap-4 flex flex-wrap p-4 overflow-scroll no-scrollbar'>
        {cards.map((searchedCity:string, index:number) => (
          <Card key={index} index={index+1} city={searchedCity} />
        ))}
      </section>
    </main>
  )
}

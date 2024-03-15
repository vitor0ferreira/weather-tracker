import Image from "next/image";

export default function Card({city}:any) {
    
    const weatherIconURL = `https://openweathermap.org/img/wn/${city.weather_desc[0].icon}@2x.png`

    return (
      <div className="min-w-[200px] w-[30rem] max-w-[85%] min-h-[40rem] h-max bg-slate-800/90 flex text-white shadow-md rounded-md text-elipsis overflow-hidden">
        <section className="flex flex-col items-center flex-1 p-4 gap-2 text-2xl">
          <div className="flex items-center justify-center text-center text-4xl font-bold italic w-full drop-shadow-md text-ellipsis">
            {city.name}
            <Image src={weatherIconURL} height={100} width={100} alt="weather_icon"/>
          </div>
          <article className="flex w-full justify-between font-semibold drop-shadow-md pb-2 border-b-8 border-slate-600/60">
            Temperatura <p>{city.temperature}ºC</p>
          </article>
          <article className="flex w-full justify-between font-semibold drop-shadow-md pb-2 border-b-8 border-slate-600/60">
            Umidade <p>{city.humidity}%</p>
          </article>
          <article className="flex w-full justify-between font-semibold drop-shadow-md pb-2 border-b-8 border-slate-600/60">
            Sensação Térmica <p>{city.feels_like}ºC</p>
          </article>
        </section>
      </div>
    );
}
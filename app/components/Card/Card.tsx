
export default function Card({city}:any) {
    const GoogleAPIKey = process.env.GOOGLE_API_KEY

    /* async function getImage() {
        const imageFetch = await fetch(`https://places.googleapis.com/v1/Uberaba/media?key=&{GoogleAPIKey}&maxHeightPx=1200&skipHttpRedirect=true`)
        const imageResponse = await imageFetch.json()

        return imageResponse
    }

    const imageData = getImage() */

    return(
        <div className='w-[80%] min-h-[40rem] h-max bg-slate-800/90 flex text-white shadow-md  text-elipsis overflow-hidden'>
            <section className="flex-1 flex flex-col p-4 gap-3 bg-blue-800/90">
                <h1 className='text-center text-4xl font-bold italic w-full drop-shadow-md text-ellipsis'>
                    {city.name}
                </h1>
                <div className="h-full bg-emerald-600 flex items-center justify-center">
                    City Photo
                </div>
            </section>
            <section className="flex flex-col items-center flex-1 p-4 gap-2 text-3xl">
                <article className="text-4xl">
                    {city.weather_desc[0].description}
                </article>
                <article className='flex w-full justify-between font-semibold drop-shadow-md'>
                    Temperatura <p>{city.temperature}ºC</p>
                </article>
                <article className='flex w-full justify-between font-semibold drop-shadow-md'>
                    Umidade <p>{city.humidity}%</p>
                </article>
                <article className='flex w-full justify-between font-semibold drop-shadow-md'>
                    Sensação Térmica <p>{city.feels_like}%</p>
                </article>
            </section>
        </div>
    )
}
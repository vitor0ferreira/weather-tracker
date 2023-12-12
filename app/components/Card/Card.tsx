import { IoCloseSharp } from "react-icons/io5";

export default function Card({props, city, index}:any) {

    function removeCard(){

    }


    return(
        <div className='w-48 h-max bg-gradient-to-b from-slate-600 to-blue-900 p-2 rounded-md flex flex-col text-white shadow-md shadow-black hover:from-green-700 hover:to-green-900 text-elipsis overflow-hidden animate-colorPump'>
            <aside className="absolute flex items-center justify-center font-semibold">{index + 1}</aside>
            <button 
            onClick={removeCard}
            className="absolute right-0 -translate-x-2 h-max w-auto z-20">
                <IoCloseSharp className="bg-white/30 hover:bg-red-600 text-sm rounded-full"/>
            </button>
            <h1 className='text-center text-3xl font-bold w-full drop-shadow-md text-ellipsis'>{city}</h1>
            <section className='flex justify-between font-semibold drop-shadow-md'>Temperatura <p>00</p> </section>
            <section className='flex justify-between font-semibold drop-shadow-md'>Umidade <p>00</p> </section>
        </div>
    )
}
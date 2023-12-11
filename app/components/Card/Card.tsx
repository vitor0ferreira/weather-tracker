
export default function Card(props:any) {

    return(
            <div>
                <h1>{props.city}</h1>
                <span>Temperatura:{props.temperature}</span>
                <span>Umidade:{props.humidity}</span>
            </div>
    )
}
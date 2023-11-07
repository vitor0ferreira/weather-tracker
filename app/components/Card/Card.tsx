import styled from "styled-components";

export default function Card(city:any) {

    return(
            <StyledCard>
                <h1>{city.name}</h1>
                <span>Temperatura:{city.temperature}</span>
                <span>Umidade:{city.humidity}</span>
            </StyledCard>
    )
}


const StyledCard = styled.div`
    aspect-ratio: 1/1;
    width: 300px;
    height: auto;
    border-radius: 1rem;
    background-color: white;
    padding: 1rem;
    color: black;
    box-shadow: 2px 2px 8px rgba(0,0,0,0.4);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
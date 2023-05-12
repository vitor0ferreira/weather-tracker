import styled from "styled-components";

export default function Card(props:any) {

    return(
        <StyledCard>
            <h1>{props.city}</h1>
            <span>Temperatura: {props.temperature}</span>
            <span>Umidade: {props.humidity}</span>
        </StyledCard>
    )
}


const StyledCard = styled.div`
    aspect-ratio: 1/1;
    width: 300px;
    height: auto;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
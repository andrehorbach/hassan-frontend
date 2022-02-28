import React from "react";
import styled from 'styled-components';
import BoltIcon from '@mui/icons-material/Bolt';

const CardHeading = styled.div`
  font-size: 1.4rem;
`

const CardInjury = styled.div`
  display: inline;
  font-size: 1.2rem;
`
const CardShock = styled.div`
display: block;
font-size: 1.2rem;
line-height: normal;
vertical-align: middle;
`

function randomInjuryDays() {
  let injuryDays = Math.floor(Math.random() * 1000) + 1
  return injuryDays
}

function Card(props) {
  return(
    <div>
      <CardHeading>{props.name}</CardHeading>
      <div className="card-body">
        <div>{props.injuries.map((element)=>{
          return (  
            <CardInjury> {"- " + element}<br/> </CardInjury>
        )})}
        </div>
        <div className="injuryDays">
          <span>{randomInjuryDays()}</span>
          </div>
      </div>
      <CardShock><BoltIcon/>156</CardShock>
    </div>
  )
}

export default Card;
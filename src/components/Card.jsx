import React from "react";
import styled from 'styled-components';
import BoltIcon from '@mui/icons-material/Bolt';

const CardContainer = styled.div`
  display: grid;
  height: 100px;
  line-height: normal;
  grid-template-columns: 1.5fr 1.1fr 1fr;
  vertical-align: middle;
`

const CardShock = styled.div`
  line-height: 25px;
  padding-left: 10px;
  vertical-align: center;
`

const CardLeft = styled.div`
  font-size: 1.4rem;
  line-height: 60px;
  padding-left: 5px;
`

const CardRight = styled.div`
  font-weight: 1000;
  font-size: 2.0rem;
  line-height: normal;
`

function randomInjuryDays() {
  let injuryDays = Math.floor(Math.random() * 250) + 1
  return injuryDays
}

function countDays(injuryDays){
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date();
  const secondDate = new Date(injuryDays);
  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  return diffDays;
}

function Card(props) {
    return (
      <div>
        <CardContainer>
          <CardLeft>
            <span class="card-name">{props.name}</span>
            <CardShock>
             <div className="shock"><BoltIcon/></div>
             <span className="">{props.shock}</span>
            </CardShock>
            
          </CardLeft>
          {/* <CardMiddle> */}
            <div className="injuries">
              <ul>
                {props.injuries.map((element)=>{
                return (  
                  <li>{element} </li>
              )})}
              
            </ul>
            </div>
          {/* </CardMiddle> */}
          <CardRight>
             <div className="injury-days">
             <span>{countDays(props.startDate)}</span>
             {/* <span>{props.startDate}</span> */}
              </div>
          </CardRight>
        </CardContainer>
      </div>
    )
}


export default Card;
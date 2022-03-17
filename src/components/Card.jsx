import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function countDays(injuryDays){
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date();
  const secondDate = new Date(injuryDays);
  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  return diffDays;
}


function Card(props) {

  const client = props.id

  const handleSubmit = () => {
    props.deleteRequest(client);
   }

    return (
      <div>
        <div className="card-container">
          <div className="card-left">
            <span class="card-name">{props.name}</span>
            <div className="card-shock">
            <div className="shock"><FontAwesomeIcon icon={faBolt} /></div>
             <span className="shock-value"> {props.shock}</span>
            </div>
          
          </div>
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
          <div className="card-right">
             <div className="injury-days">
             <span>{countDays(props.startDate)}</span>
             </div>

             
             {/* <span>{props.startDate}</span> */}
              
          </div>
        </div>
        
      </div>
    )
}


export default Card;
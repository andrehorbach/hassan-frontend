import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

function Card(props) {

  const changedClient = {
    id: "",
    name: "",
    startDate: "",
    injuries: [],
    shock: 0
  }
  
  //let isEditMode = false;
  const [currShock, changeCurrShock] = React.useState(props.shock)
  const [editMode, changeEditMode] = React.useState(false)
  const [client, setClient] = React.useState(changedClient)

  function toggleEditMode() {

    changeEditMode(!editMode)
    if (editMode) props.changeShock(client);

  }

  function editShock(currentShock){
    const {value} = currentShock.target;
    changeCurrShock(value)
    
    setClient(prevValue => {
      return {
        ...prevValue,
        id: props.id,
        name: props.name,
        startDate: props.startDate,
        injuries: props.injuries,
        shock: value
      }
    })

  }
  
  function countDays(injuryDays){
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date();
    const secondDate = new Date(injuryDays);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  }

    return (
      <div>
        <div className="card-container">
          <div className="card-left">
            <span class="card-name">{props.name}</span>
            <div className="card-shock">
               {editMode ? (
                 <div className="shock-edit">
                    <FontAwesomeIcon 
                      icon={faCheck}
                      onClick={toggleEditMode} 
                    />
                    <input 
                    autoFocus
                    className="shock-value-edit"
                    value={currShock} 
                    name="teste"
                    onChange={editShock}
                    >

                    </input>
                    <br />
                  </div>
               
               ) : (             
                 <div 
              className="shock"
              onClick={toggleEditMode}
              >
                  <FontAwesomeIcon icon={faBolt} />
                  <span className="shock-value"> {currShock}</span>
                </div>
               )
               }      
              
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
import React, { useState, useEffect } from "react";
import './App.css';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
//import {v4 as uuid} from 'uuid';
//import clients from "./clientList";
import axios from 'axios';
import Heading from "./components/Heading"
import Card from "./components/Card"

// const itemsFromBackend = [
//   { id: uuid(), content: "First task" },
//   { id: uuid(), content: "Second task" },
//   { id: uuid(), content: "Third task" },
//   { id: uuid(), content: "Fourth task" },
//   { id: uuid(), content: "Fifth task" },
//   { id: uuid(), content: "Sixth task" },
//   { id: uuid(), content: "Seventh task" },
//   { id: uuid(), content: "Eighth task" }
// ];



var clientList = [
  {
    "_id": "620eec846bbb1d2487142f9f",
    "id": "dd95a973-3457-492e-953a-95fc37c090da",
    "content": 1,
    "name": "Atualizar",
    "startDate": "",
    "injuries": [],
    "shock": "",
    "__v": 0
  }
];

var columnList = {
  ['Column A']: {
    name: "Programação do Dia",
    items: [],
    style: {
      backgroundColor: "rgb(214, 214, 214)",
      borderRadius: "10px"
    }
  },
  ['Column B']: {
    name: ".",
    items: clientList,
    style: {
      backgroundColor: "rgb(244, 244, 244)",
      marginLeft: 25
    }
  },
  ['Column C']: {
    name: ".",
    items: [],
    style: {
      backgroundColor: "rgb(244, 244, 244)"
    }
  },
  // [uuid()]: {
  //   name: ".",
  //   items: [],
  //   style: {
  //     backgroundColor: "rgb(244, 244, 244)" 
  //   }
  // },
  // [uuid()]: {
  //   name: ".",
  //   items: [],
  //   style: {
  //     backgroundColor: "rgb(244, 244, 244)" 
  //   }
  // },
  // [uuid()]: {
  //   name: ".",
  //   items: [],
  //   style: {
  //     backgroundColor: "rgb(244, 244, 244)" 
  //   }
  // }
};
//console.log(itemsFromBackend);



// // const getClients = () => {
//   axios.get('http://localhost:8080/')
//     .then(function(res){
//       itemsFromBackend = res.data
//       console.log('Items from backend axios:' );
//       console.log(itemsFromBackend);
//       return itemsFromBackend
//     })
//   // }

const onDragEnd = (result, taskColumns, setTaskColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = taskColumns[source.droppableId];
    const destColumn = taskColumns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setTaskColumns({
      ...taskColumns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
 
  } else {
    const column = taskColumns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setTaskColumns({
      ...taskColumns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    })
  }
};
function App() {

  const [itemsFromBackend, setItemsFromBackend] = useState(clientList);
  const [columnsFromBackend, setColumnsFromBackend] = useState(columnList); //andre 28-02
  const [taskColumns, setTaskColumns] = useState(columnsFromBackend); //original
  // console.log("ColumnList B start:");
  // console.log(columnList["Column B"].items);

  useEffect(async () => {

    const response = await fetch('http://localhost:8080/');
    const data = await response.json();

    columnList["Column B"].items = data[0]
    
    setColumnsFromBackend(columnList)
    setTaskColumns(columnsFromBackend)

  }, [])
  
  console.log(columnList);
  return (
    <div className="main-wrapper">
      <Heading />
      <div className="context-wrapper">
        <DragDropContext
          className="customFont"
          onDragEnd={result => onDragEnd(result, taskColumns, setTaskColumns)}
        >
          {Object.entries(taskColumns).map(([columnId, column], index) => {
            return (
              <div className="column-wrap" key={columnId}>
                <h2>{column.name}</h2>
                <div style={column.style}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div className="dropbox"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          // style={{

                            // background: snapshot.isDraggingOver
                            //   ? "transparent"
                            //   : "transparent"
                            
                          // }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div className="dragbox"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        
                                        backgroundColor: snapshot.isDragging
                                          ? "#ddd"
                                          : "#eee",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                    {/* Items go below here */}
                                      <Card 
                                        name = {item.name}
                                        injuries = {item.injuries}
                                        shock = {item.shock}
                                        startDate = {item.startDate}
                                      />
                                     
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>  
    );
}
export default App;
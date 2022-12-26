import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Heading from "./components/Heading"
import Card from "./components/Card"
import AddBtn from "./components/AddBtn"
import { isPlainObject } from "@mui/utils";

var columnList = {
  ['Column A']: {
    name: "",
    items: []
  },
  ['Column B']: {
    name: ".",
    items: []
  },
  ['Column C']: {
    name: ".",
    items: []
  },
  ['Column D']: {
    name: ".",
    items: []
  },
  ['Column E']: {
    name: ".",
    items: []
  },
  ['Column F']: {
    name: ".",
    items: []
  }
}; 

const onDragEnd = (result, taskColumns, setTaskColumns, count, setCount) => {
 

  if (!result.destination) {
    // executar comando para excluir, perguntando ao usuário
    const { source, destination } = result;
    const sourceColumn = taskColumns[source.droppableId];
    const sourceItems = [...sourceColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    setTaskColumns({
      ...taskColumns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      }
    });
    setCount(count + 1);
    return;
  }
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
  //setCount para alterar 'count', e assim rodar o 'useEffect':
  setCount(count + 1);

};

//function to add new client to firstcolumn
const addClient = (newClient, taskColumns, setTaskColumns, count, setCount) => {

  const column = taskColumns['Column A'];
  const copiedItems = [...column.items];
  copiedItems.push(newClient);

  taskColumns['Column A'].items.push(newClient);

  setTaskColumns({
      ...taskColumns,
      ['Column A']: {
        ...column,
        items: copiedItems
      }
    })

  setCount(count + 1); //send to backend 

}

//function to send new Shock to backend

const changeShock = (changedClient, taskColumns, setTaskColumns, count, setCount) => {

  const client = changedClient
  let columns = {}

  let newColumns = taskColumns
  
  console.log(client.shock);

  console.log(newColumns);

  // loop through taskColumns so we can update it properly:
  for (let val in newColumns) {
    if(isPlainObject(newColumns[val])) {
      for (let val2 in newColumns[val]) {
        if (Array.isArray(newColumns[val][val2])) {
          for (let val3 in newColumns[val][val2]) {
           if(isPlainObject(newColumns[val][val2][val3])){
            if (newColumns[val][val2][val3].name === client.name) {
              //console.log("Shock changed from " + root[val][val2][val3].shock + " to " + client.shock)
              newColumns[val][val2][val3].shock = client.shock
            }
           }
          }
        }
      }
    }
  }
 
  console.log(newColumns);

  setTaskColumns(newColumns);

//  console.log(taskColumns);
  //setCount(count + 1);

};

//

//função para atualizar (enviar ao backend) as colunas:
async function updateColumns(columns) {
 
  const newColumns = {Columns: columns}

  try {
    const response = await fetch('https://hassan-backend.onrender.com/posts/', {
    //const response = await fetch('http://localhost:8080/posts/', {
      
      method: "POST",
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newColumns)
    })
    const data = await response.json();
    return data;
  } catch (e){
    return e;
  }
}

function App() {
  
  //const [itemsFromBackend, setItemsFromBackend] = useState(clientList);
  const [columnsFromBackend, setColumnsFromBackend] = useState(columnList); //andre 28-02
  const [taskColumns, setTaskColumns] = useState(columnsFromBackend); //original
  const [count, setCount] = useState(true);
  const isInitialMount = useRef(true);

  // useEffect para carregar as colunas
  useEffect(async () => {

    const response = await fetch('https://hassan-backend.onrender.com/');
    //const response = await fetch('http://localhost:8080/');
    const data = await response.json();

    columnList = data[0].Columns

    setTaskColumns(columnList)    
  }, [])

  // useEffect que terá como 'trigger' a alteração em count (oriunda do onDragEnd), e acionará a função async function updateColumns(columns).
  useEffect(() => {
    if (isInitialMount.current) {
       isInitialMount.current = false;
    } else {
      updateColumns(taskColumns)
    }
  }, [count]);


  return (
    
    <div className="main-wrapper">
      <Heading />
      <div className="context-wrapper">
        <DragDropContext
          className="customFont"
          onDragEnd={result => onDragEnd(result, taskColumns, setTaskColumns, count, setCount)}
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
                          style={{

                            background: snapshot.isDraggingOver
                              ? "transparent"
                              : "transparent"
                            
                          }}
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
                                        key = {item.id}
                                        id = {item.id}
                                        name = {item.name}
                                        injuries = {item.injuries}
                                        shock = {item.shock}
                                        startDate = {item.startDate}
                                        changeShock ={changedClient => changeShock(changedClient, taskColumns, setTaskColumns, count, setCount)}
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
      <AddBtn 
        onAdd={newClient => addClient(newClient, taskColumns, setTaskColumns, count, setCount)}
      />
    </div>  
    );
}
export default App;
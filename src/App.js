import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Heading from "./components/Heading"
import Card from "./components/Card"
import AddBtn from "./components/AddBtn"
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";


var columnList = {
  ['Column A']: {
    name: "Programação do Dia",
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

  console.log(newClient);

  taskColumns['Column A'].items.push(newClient);

  setTaskColumns({
      ...taskColumns,
      ['Column A']: {
        ...column,
        items: copiedItems
      }
    })

  
  console.log(taskColumns)
  setCount(count + 1); //send to backend

}

//função para atualizar (enviar ao backend) as colunas:
async function updateColumns(columns) {
 
  const newColumns = {Columns: columns}

  try {
    const response = await fetch('http://localhost:8080/posts/', {
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

    const response = await fetch('http://localhost:8080/');
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
                          // style={{

                            // background: snapshot.isDraggingOver
                            //   ? "transparent"
                            //   : "transparent"
                            
                          // }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
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
      <AddBtn 
        onAdd={newClient => addClient(newClient, taskColumns, setTaskColumns, count, setCount)}
      />
    </div>  
    );
}
export default App;
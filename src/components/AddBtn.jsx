import React from "react";
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InjuryList from './InjuryList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { format } from 'date-fns'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
//import DatePicker from '@mui/lab/DatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
const { v4: uuidv4 } = require('uuid');

const theme = createTheme({

  typography: {
    allVariants: {
      textTransform: 'none',
      fontSize: 16,
    },
  },
});

function AddBtn(props) {
  
  // constant to keep Clients data:
  const newClient = {
    id: "",
    name: "",
    startDate: "",
    injuries: [],
    shock: 0
  }

  //const { name, startDate, injuries } = newClient;

  const [open, setOpen] = React.useState(false); // state for Dialog
  const [client, setClient] = React.useState(newClient); // state for newClient
  const [value, setValue] = React.useState();


  // Controles de Dialog ->
  const handleClickOpen = () => {
   setOpen(true);
  };

  const handleClose = () => {
   setOpen(false);
  };

  const handleSubmit = () => {
   props.onAdd(client);
   setOpen(false);  
  }

  // <- Controles de Dialog

  // Controles de Valor ->
  
  function changeClient(e){
    const {name, value} = e.target;
    setClient(prevValue => {
      return {
        ...prevValue,
        "id": uuidv4(), 
        [name]: value
      }
    }
    )
  }

  function changeDate(newDate) {

    setValue(newDate);
    setClient(prevValue => {
      return {
        ...prevValue,
        ["startDate"]: newDate
      }
    })



  }

  function changeInjuries(injuries){
    const newInjuries = injuries;
    setClient(prevValue => {
      return {
        ...prevValue, 
        ["injuries"]: newInjuries
      }
    }
    )
 
  }

 // <- Controles de Valor:

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="add-button">
        <Button
          onClick={handleClickOpen} 
        >
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <ThemeProvider theme={theme}>
            <DialogTitle>Incluir Aluno</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Preencha os dados abaixo:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nome"
                type="text"
                name="name"
                fullWidth
                value={client.name}
                variant="standard"
                onChange={changeClient}
              />
           <br/><br/>
              <DesktopDatePicker
                label="Data de Início"
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={changeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            <br/><br/>
            <DialogContentText>
                Lesões
              </DialogContentText>
            <InjuryList 
              injuries = {client.injuries}
              onChange={changeInjuries}
            />
            </DialogContent>
        </ThemeProvider>
          <DialogActions>
            <Button onClick={handleClose}>Sair</Button>
            <Button onClick={handleSubmit}>Incluir</Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  )
}

export default AddBtn;

// // datepicker backup
// <DatePicker
// label="dd/mm/aaaa"

// inputFormat="dd.MM.yyyy"
// onChange={(newValue) => {
//   setValue(newValue);
// }}
// renderInput={(params) => <TextField {...params} />}
// />
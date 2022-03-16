import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Grid from '@material-ui/core/Grid'


function InjuryList(props) {

const injuryColumn1 = ["LCA", "LCP", "Sutura", "LAL"];
const injuryColumn2 = ["DFP", "Tendinite", "Fratura", "Artrose"];
const [checked, setChecked] = React.useState([]); // state for List and Checkboxes

// Controles de Lista ->
const handleToggle = (value) => () => {

 const currentIndex = checked.indexOf(value);
 const newChecked = [...checked];

 if (currentIndex === -1) {
   newChecked.push(value);
 } else {
   newChecked.splice(currentIndex, 1);
 }

   setChecked(newChecked);
   props.onChange(checked);
   console.log(checked)
 };

  return (<div>
    <Grid container>
    <List xs={{ width: '50%', maxWidth: 230, bgcolor: 'background.paper' }}>
      {injuryColumn1.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
              
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    <List sx={{ width: '50%', maxWidth: 230, bgcolor: 'background.paper' }}>
        {injuryColumn2.map((value) => {
          const labelId = `checkbox-list-label-${value}`;
    
          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Grid> 
     
     
    
    </div>
 )
 // <-- Controles de Lista
}

 export default InjuryList;
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

function DeleteBtn() {
  return (
    <Button class="close-btn">
      <DeleteIcon />
    </Button>
  )
}

export default DeleteBtn;
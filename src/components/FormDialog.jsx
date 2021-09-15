import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function FormDialog({isOpen,handleClose,boardName,setBoardName,isBoardPrivate,setIsBoardPrivate}) {
 

  return (
    <div>
      <Dialog open={isOpen}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Board Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="boardname"
            label="Board Name"
            type="text"
            fullWidth
           
            onChange={(e)=>{ setBoardName(e.target.value)}}
          />
        </DialogContent>
        <DialogContent>
        <FormControlLabel
        control={
          <Checkbox
         
           onChange={(e)=> setIsBoardPrivate(e.target.checked) }
            name="checkedB"
            color="primary"
          />
        }
        label="Private Board"
      />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Finish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

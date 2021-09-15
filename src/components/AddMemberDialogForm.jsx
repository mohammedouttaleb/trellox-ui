import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function AddMemberDialogForm({open,handleAddBoardMember,setmemberEmail}) {
 

  

  return (
    <div>
      <Dialog open={open}  aria-labelledby="form-dialog-title"  >
        <DialogTitle id="form-dialog-title">Invite to board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="boardname"
            label="Email Address or name"
            type="email"
            fullWidth
           onChange={ (event)=> setmemberEmail(event.target.value) }
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddBoardMember} color="primary">
            Send Invitation
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

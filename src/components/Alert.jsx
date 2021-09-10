import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function CustomizedSnackbars({message,status,openAlert,handleClose}) {
  

  return (
    <div >
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          { status} { message}
        </Alert>
      </Snackbar>
    </div>
  );
}

import  React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import {  makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Alert from './Alert';
import CloseIcon from '@material-ui/icons/Close';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CommentComponent from './CommentComponent'





const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  }
}));



export default function UpdateCardDialog({open,handleClose,card,boardName,userToken,listIndex}) {

  const classes = useStyles();

  const [addMemeberFormOpen, setAddMemeberFormOpen] = useState(false);
  
   const [newMemberEmail, setNewMemberEmail] = useState("");
  
   const [emails, setEmails] = useState(card.membersEmails);

   const [addCommentProcess, setAddCommentProcess] = useState(false)
   
   const [commentList, setCommentList] = useState(card.comments)

   const [comment, setComment] = useState("")






   //alert state variable
  const [openAlert, setOpenAlert] = React.useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(0);
  
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };
  const handleShow = () => {
    setOpenAlert(true);
  };


   //add CardMember process
  function handleAddCardMember(){

    //change the UI
    setAddMemeberFormOpen(!addMemeberFormOpen);
    
    if(newMemberEmail.length!==0){

      //make the API call to add the new member to the card
      let cardId=card.cardId
      axios(
          {
            method:"PUT",
            url:"http://localhost:8080/updateCard/"+boardName+"?cardId="+cardId+"&newMemberEmail="+newMemberEmail+"&userToken="+userToken
          }
      )
      .then(
        response => {
          console.log(response.data);
          let mylist=response.data.lists[listIndex];
         let myCard= mylist.cardList.filter( card => card.cardId===cardId  );
         setEmails(myCard[0].membersEmails);
         card.membersEmails=myCard[0].membersEmails;
        }
      )
      .catch(
        err => {
          console.log(err.response);
          let message=err.response.data.message,
          status=err.response.status;
          console.log(message);
          console.log(status);
          //set the error state variable
          setErrorMessage(message);
          setErrorStatus(status);
          setOpenAlert(true);
        }
      )
    }
  }


  function handleAddComment(){

    if(comment.length!==0){

      //change th UI
      setAddCommentProcess(false)
      //make the Api call
      let cardId=card.cardId
      axios(
        {
          method:"PUT",
          url:"http://localhost:8080/updateCard/"+boardName+"?cardId="+cardId+"&newComment="+comment+"&userToken="+userToken
        }
      )
      .then(
        response =>{
          console.log(response.data);
          let mylist=response.data.lists[listIndex];
  
         let myCard= mylist.cardList.filter( card => card.cardId===cardId  );
         console.log(myCard[0].comments);
         setCommentList(myCard[0].comments)
         card.comments=myCard[0].comments;
         
        }
      )
      .catch(
        err =>{
               console.log(err.response);
        }
      )
    }
  }

  return (

    <div>
    <Dialog open={open} onClose={handleClose} fullWidth={"md"}   >
      <DialogTitle style={{backgroundColor:"#EEEEEE"}} >{card.cardName}</DialogTitle>
      <Divider orientation="horizontal"   />
      <DialogContent style={{backgroundColor:"#EEEEEE"}} >
      <DialogTitle>Members</DialogTitle>
      
       <div style={{display:"flex"}} >
        {
          !addMemeberFormOpen ? 
          <AddCircleOutlineIcon 
          fontSize="large"
           onClick={()=> setAddMemeberFormOpen(!addMemeberFormOpen)}
            /> :
          
          <div>
          
          <TextField 
            id="outlined-basic"
             label="Enter New Member Email"
              variant="outlined"
              type="email"
               style={{width:"95%",marginTop:"5px",marginLeft:"5px"}}
               onChange={(event)=> setNewMemberEmail(event.target.value) }
                />
                
                <Button 
                color="primary"
                 variant="contained"
                  style={{marginBottom:"30px",marginLeft:"5px",marginTop:"5px"}}
                  onClick={handleAddCardMember}
                  >
                  Add Member
                  </Button>
                  <CloseIcon  
                fontSize="large"
                onClick={()=> setAddMemeberFormOpen(false)}
                  />
          
          </div>
        }     
      
       <div style={{display:"flex"}} >
         {
          emails!=null &&
          emails.map(   (email,index) =>{ return( <Avatar key={index}  title={email} style={{marginLeft:"5px"}} sx={{ width: 12, height: 12 }}  className={classes.orange}>{email.charAt(0)+email.charAt(1)}</Avatar>)}   )
          }
       </div>
       </div>
       <div>
         <DialogTitle style={{marginTop:"5px"}} >Comments</DialogTitle>
         {
           !addCommentProcess ? 
           <TextField 
            id="outlined-basic"
             label="Write a Comment......"
              variant="outlined"
               style={{width:"100%",marginTop:"5px",marginLeft:"5px"}}
               onClick={ ()=> setAddCommentProcess(true)}
               disabled
                />:
           <div  > 
            <TextField 
            id="outlined-basic"
             label="Write a Comment......"
              variant="outlined"
               style={{width:"100%",marginTop:"5px",marginLeft:"5px"}}
               
               onChange={(event)=> setComment(event.target.value) }
                />
                <div >
                <Button 
                color="primary"
                 variant="contained"
                  style={{marginBottom:"30px",marginLeft:"5px",marginTop:"5px"}}
                 onClick={handleAddComment} 
                  >
                  Save
                  </Button>
                <CloseIcon  
                fontSize="large"
                onClick={()=> setAddCommentProcess(false)}
                  />
                </div>
            </div>
         }
         {
           commentList!=null &&
           <Stack spacing={2}   >
            {commentList.map(  (commentElement,index)  => <CommentComponent key={index} commentElement={commentElement} classes={classes}   />   ) }
           </Stack>

         }
         
       </div>
      </DialogContent>
      <DialogActions style={{backgroundColor:"#EEEEEE"}} >
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
      { errorMessage.length!==0 && 
      <Alert
       message={errorMessage} 
       status={errorStatus} 
       openAlert={openAlert} 
       handleClose={handleAlertClose}  
       handleShow={handleShow} /> 
       }  
    </Dialog>
  </div>
  );
}

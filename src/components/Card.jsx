import React from 'react'
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import UpdateCardDialog from './UpdateCardDialog';


function Card({element,board,userToken,removeCard,listIndex}) {

  const [openCardDialog, setOpenCardDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenCardDialog(true);
  };

  const handleClose = () => {
    setOpenCardDialog(false);
  };
    

    function handleRemoveCard(){

         let cardId= element.cardId,
         boardName=board.boardName;

      
         //call the Api
         axios(
           {
            method:"DELETE",
            url:"http://localhost:8080/deleteCard/"+boardName+"?cardId="+cardId+"&userToken="+userToken
           }
         )
         .then(
             response =>{
                 if(response.status===200){
                   removeCard(cardId);
                 }
             }
         )
         .catch( 
             error =>{ 
                 console.log(error);
             }
         )
    }

    return(
            <>
             <Paper 
             
              style={
                {height:50 ,
                 width: 240,
                backgroundColor:"#EEEEEE",
                marginBottom:"10px",
                display:"flex",
                justifyContent:"space-between"
                }
                } 
                onClick={handleClickOpen}
                >
                 <label style={{marginLeft:"5px",overflow:"hidden",textOverflow:"ellipsis"}}  ><h4>{element.cardName}</h4></label>
                <CloseIcon  fontSize="medium" 
                  style={{marginTop:"20px"}}
                  onClick={handleRemoveCard}
                  />
              </Paper>
                      {
                        openCardDialog && 
                      <UpdateCardDialog
                       open={openCardDialog}
                        handleClose={handleClose}
                        card={element}
                        boardName={board.boardName}
                        userToken={userToken}
                        listIndex={listIndex}
                         />
                        }
              </>
    )
    
}


export default Card;
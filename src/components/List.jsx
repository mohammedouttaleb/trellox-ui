import React,{useState} from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import Card from './Card';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SimpleMenu from './SimpleMenu';



function List({element,board,userToken,removeList,getListIndexes,swapTwoLists,listIndex,updateListAfterAddingCard}) {


    const [paperStyle, setPaperStyle] = useState({ height:80 , width: 240,backgroundColor:"#EEEEEE"});
    const [cards, setCards] = useState(element.cardList);
    const [addCardProcess, setaddCardProcess] = useState(false);
    const [cardName, setCardName] = useState("");
    const [updateListProcess, setUpdateListProcess] = useState(false);

    const [showMoveListMenu, setShowMoveListMenu] = useState(false);
    


    //this state variable and these 3 functions handle the modifying process of the list  ('...' function)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setUpdateListProcess(false);
    };


    //this 2 functions starts abd ends the Add Card Process and also change the Ui

    function startAddCardProcess(){
       setaddCardProcess(true);
       setPaperStyle(prev =>{ return {...prev,height:100} })
    }
    function endAddCardProcess(){
      setaddCardProcess(false);
      setCardName("");
      setPaperStyle(prev =>{ return {...prev,height:80} })
   }

   function removeCard (cardId){

    setCards(  prev =>{ return prev.filter( element => element.cardId!==cardId ) }    )
   }


   //this function handle Add Card Process
   function HandleAddCard(){
     
    if(cardName.length!==0){

      let boardName=board.boardName,
      listId=element.listId;

      axios(
        {
          method:"POST",
          url:"http://localhost:8080/addCard/"+boardName+"?cardName="+cardName+"&listId="+listId+"&userToken="+userToken
        }
      )
      .then(
        response =>{
          console.log(response);
         
           endAddCardProcess();
          let myListArray= response.data.lists.filter( list => list.listId===listId );
         
          let myList=myListArray[0];
          console.log(myList);
                 let newCardList=myList.cardList;
          console.log(cards);
          setCards( newCardList);
          //set the new list
          updateListAfterAddingCard(listIndex,myList);
  
         
        }
      )
      .catch(
        error =>{
          console.log(error);
        }
      )
     }
   }


   function UpdateList(event) {
     setUpdateListProcess(true);
     handleClick(event);
   }

   function deleteList() {

    //change the UI
    handleClose();

    //call the api to delete the list
    let listId= element.listId,
    boardName=board.boardName;

 
    //call the Api
    axios(
      {
       method:"DELETE",
       url:"http://localhost:8080/deleteList/"+boardName+"?listId="+listId+"&userToken="+userToken
      }
    )
    .then(
        response =>{  if(response.status===200)  removeList(listId); }
    )
    .catch( 
        error =>{ 
            console.log(error);
        }
    )
     
   }

   function moveList(){

    setShowMoveListMenu(true);

   }
   function hideMoveListMenue(){

    setShowMoveListMenu(false);

   }

    return(
        <Grid  item>
              <Paper style={paperStyle} draggable="true" >
              <div style={{
                 display:"flex",
                justifyContent:"space-between"
              }} >
            <Button
            color="primary" 
            style={{marginLeft:"0px",marginBottom:"0    0px",width:"100%"}}  >{element.listName}
            </Button>
            <MoreHorizIcon 
            fontSize="medium"
            aria-controls="simple-menu" 
            aria-haspopup="true"
             
            onClick={UpdateList}  />
            { 
              updateListProcess && 
              <SimpleMenu 
              handleClick={handleClick}
               handleClose={handleClose}
                deleteList={deleteList}
                 anchorEl={anchorEl}
                 showMoveListMenu={showMoveListMenu}
                 moveList={moveList} 
                 getListIndexes={getListIndexes} 
                 swapTwoLists={swapTwoLists}
                 currentIndex={listIndex}
                 hideMoveListMenue={hideMoveListMenue}
                  />
             }
            </div>
            <Divider />

{!addCardProcess ? 
           <Button
            color="primary" 
            style={{marginLeft:"0px",marginBottom:"10px",width:"100%"}} 
            onClick={ startAddCardProcess}
           >
            <AddIcon fontSize="large" />Add Card</Button>
            :
            <div  > 
            <TextField 
            id="outlined-basic"
             label="Enter Card Name"
              variant="outlined"
               style={{width:"95%",marginTop:"5px",marginLeft:"5px"}}
               onChange={(event)=> setCardName(event.target.value) }
                />
                <div >
                <Button 
                color="primary"
                 variant="contained"
                  style={{marginBottom:"30px",marginLeft:"5px",marginTop:"5px"}}
                 onClick={HandleAddCard} 
                  >
                  Add Card
                  </Button>
                <CloseIcon  
                fontSize="large"
                onClick={endAddCardProcess}
                  />
                </div>
            </div>
            }
           
                  
            { (cards!==null &&cards.length!==0) &&
              cards.map((element,index) => (  <Card element={element} key={index} listIndex={listIndex} board={board} userToken={userToken} removeCard={removeCard} /> ))
          }
           
            
            </Paper>
            </Grid>
    )
    
}

export default List;
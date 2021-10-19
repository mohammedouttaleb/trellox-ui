import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import List from './List';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:"20px"
  },
  paper: {
    height: 45,
    width: 240,
    padding:"auto",
    backgroundColor:"#EEEEEE"
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Board({board,userToken}) {

  const classes = useStyles();
  
  const [paperStyle, setPaperStyle] = useState({ height:45 , width: 240,backgroundColor:"#EEEEEE"});
  const [listName, setListName] = useState("");
  const [lists, setLists] = useState(board.lists);
  const [addListProcess, setaddListProcess] = useState(false);


 

  function HandleAddList() {

     if(listName.length!==0){

      let boardName=board.boardName;
      axios(
        {
          method:"PUT",
          url:"http://localhost:8080/addList/"+boardName+"?listName="+listName+"&userToken="+userToken
        }
      )
      .then(
        response =>{
          console.log(response);
          setaddListProcess(false);
          setPaperStyle({ height:45 , width: 240,backgroundColor:"#EEEEEE"});
         let newList=response.data.lists;
         setLists(newList);
         
        }
      )
      .catch(
        error =>{
          console.log(error);
        }
      )

     }  
  }
  function startAddListProcess() {
     
      setPaperStyle({ height:110 , width: 240,backgroundColor:"#EEEEEE"});
    setaddListProcess(true);
    
  }


  function removeList(listId){

    setLists( prevList =>{return(prevList.filter( element => element.listId!==listId )  ) } )
    
  }

  function updateListAfterAddingCard(index,newList) {
    
    //setLists( prevList => { return [...prevList,prevList[index-1],newList,prevList[index+1],...prevList] } )
    setLists(
      prevList => {
        let data=[...prevList]
        data[index]=newList;
        return data;
      }
    )
   
  }

  function getListIndexes() {
    let listIndexes=lists.map( (element,index) => index  );
    return listIndexes;
  }

  function swapTwoLists(index1,index2) {
    setLists(prevlist =>{
      let data=[...prevlist];
      let temp=data[index1];
      data[index1]=data[index2];
      data[index2]=temp;
      return data;
    });
    
  }

 
 

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-start" spacing={2}>
             <Grid  item  >
             <Paper  style={paperStyle} >
             {!addListProcess? 
           <Button
            color="primary" 
            style={{marginLeft:"0px",marginBottom:"50px",width:"100%"}} 
            onClick={startAddListProcess} >
            <AddIcon fontSize="large" />Add List</Button>
            :
            <div  > 
            <TextField 
            id="outlined-basic"
             label="Enter List Name"
              variant="outlined"
               style={{width:"95%",marginTop:"5px",marginLeft:"5px"}}
               onChange={ (event)=>{setListName(event.target.value)}} />
                <div >
                <Button 
                color="primary"
                 variant="contained"
                  style={{marginBottom:"30px",marginLeft:"5px",marginTop:"5px"}}
                 onClick={HandleAddList}  >
                  Add List
                  </Button>
                <CloseIcon  
                fontSize="large"
                 onClick={()=>{setaddListProcess(false);setPaperStyle(prev => { return {...prev,height:45} });}} 
                  />
                </div>
            </div>
            }
            </Paper>               
            </Grid>
          { (lists!==null &&lists.length!==0) &&
              lists.map((element,index) => (
                  <List 
                     element={element}
                     listIndex={index}
                     key={index}
                     board={board}
                     userToken={userToken} 
                     removeList={removeList}
                     getListIndexes={getListIndexes}
                     swapTwoLists={swapTwoLists}
                     updateListAfterAddingCard={updateListAfterAddingCard}
                      />
          ))
          }
        </Grid>
      </Grid>
    </Grid>
  );
}

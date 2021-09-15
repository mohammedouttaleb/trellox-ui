import React,{useState} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default function SimpleMenu({handleClose,anchorEl,deleteList,showMoveListMenu,moveList,getListIndexes,swapTwoLists,currentIndex,hideMoveListMenue}) {

 
 

  const [newIndex, setNewIndex] = useState(currentIndex);

  
  function  handleMoveList(){
     hideMoveListMenue();
    if(currentIndex!==newIndex)  swapTwoLists(currentIndex,newIndex);
  }

  return (
    <div>
     {
       !showMoveListMenu ?
    
       <Menu
        id="update-list-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose} >

        <MenuItem onClick={moveList}>Move List</MenuItem>

        <MenuItem onClick={deleteList}>Delete List</MenuItem>

        </Menu>
       :
       <Menu
        id="move-list-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose} 
        >

        <MenuItem >
         <FormControl >
        <InputLabel htmlFor="age-native-simple">Position</InputLabel>
        <Select
          native
          onChange={(event)=> { console.log(event.target.value);  setNewIndex(event.target.value) } }
          defaultValue={currentIndex}
        >
          {
            getListIndexes().map( index =>  <option key={index} value={index}>{index+1}</option> )
          }
        </Select>
      </FormControl>
      </MenuItem>

      <MenuItem onClick={handleMoveList}><Button>Move</Button></MenuItem>
      
      </Menu>

}
   </div>
  );
}

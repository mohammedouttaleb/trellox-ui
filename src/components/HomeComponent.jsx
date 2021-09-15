import React,{useState} from 'react'
import PrimarySearchAppBar from './PrimarySearchAppBar';
import Board from './Board';



function HomeComponent({userToken,userEmail}) {
    
    const [boardExists, setBoardExists] = useState(false);
    const [board, setBoard] = useState({});
    return(
        <div>
            <PrimarySearchAppBar 
              userEmail={userEmail}
              userToken={userToken}
              boardExists={boardExists} 
              setBoardExists={setBoardExists}
              setBoard={setBoard}
              />
         {boardExists && <Board board={board} userToken={userToken} />}  
        </div>
    )
}


export default HomeComponent;
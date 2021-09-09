import {useState} from 'react';
import Auth from './components/Auth';
import './App.css'

function App() {


  const [userToken, setUserToken] = useState("")

  return (
    <div className="App"  >
   { userToken.length===0 ?<Auth  setUserToken={setUserToken} />:<h1>You are logged successfully</h1>} 
    </div>
  );
}

export default App;

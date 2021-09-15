import {useState} from 'react';
import Auth from './components/Auth';
import HomeComponent from './components/HomeComponent';
import './App.css'

function App() {


  const [userToken, setUserToken] = useState("")
  const [userEmail, setUserEmail] = useState("")

  return (
    <div className="App"  >
   {
      userToken.length===0 ?
   <Auth  setUserToken={setUserToken} setUserEmail={setUserEmail} />:
   <HomeComponent userToken={userToken} userEmail={userEmail} ></HomeComponent>
   
   } 
   
    </div>
  );
}

export default App;

import React,{useState} from "react"
import Heading from "./Heading";
import Form from "./Form";
import { Container } from "@material-ui/core";




function Auth({setUserToken,setUserEmail}) {

    const [signUp, setsignUp] = useState(true);
   

    return( <Container maxWidth="sm" style={{textAlign:"center"}} >
              <br/>
              <Heading textHeading="Trellox"  /><br/><br/><br/>
              <Form signUp={signUp} setsignUp={setsignUp}  setUserToken={setUserToken} setUserEmail={setUserEmail}  />
            </Container>
     )

}

export default Auth;


    

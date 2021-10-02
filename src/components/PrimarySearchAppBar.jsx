import React,{useState} from 'react';
import Alert from './Alert';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import FormDialog from './FormDialog';
import AddMemberDialogForm from './AddMemberDialogForm';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginRight:'15px'
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  }
}));

export default function PrimarySearchAppBar({userEmail,userToken,boardExists,setBoardExists,setBoard}) {
  const classes = useStyles();

  

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const [isCreateBoardDialogOpen, setIsCreateBoardDialogOpen] = React.useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [membersEmails, setmembersEmails] = useState([])
  const [boardName, setBoardName] = useState("");
  const [isBoardPrivate, setIsBoardPrivate] = useState(false);

  const [memberEmail, setmemberEmail] = useState("");


  

  //alert state variable
  const [openAlert, setOpenAlert] = React.useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(0);

  
  const handleClickOpen = () => {
    setIsCreateBoardDialogOpen(true);
  };
  const handleAddMemberOpen = () => {
    setIsAddMemberDialogOpen(true);
  };

  const handleClose = () => {
    setIsCreateBoardDialogOpen(false);
    //after hidding the dialog i should send a http request to create the board

    axios({
      method:"POST",
      url:"http://localhost:8080/createBoard?boardName="+boardName+"&isVisible="+isBoardPrivate+"&userToken="+userToken

    })
    .then(
      response =>{ 
        console.log(response);
          //add the board object to the state
        setBoard(response.data);
        console.log("******");
        console.log(response.data);
        console.log("******");
        //set the membersemails
        let emails= response.data.membersEmail
        setmembersEmails(emails);
      
        setBoardName(response.data.boardName);

        setBoardExists(true)

        
      }
     )
     .catch(
       err => { console.log(err)}
     )
  };

  //handle the adding of a memeber to the board process
  function handleAddBoardMember() {
    
    //change the UI
    setIsAddMemberDialogOpen(false);
    
    //call the api if the email is not empty
    if(memberEmail.length!==0){

      axios(
        {
          method:"POST",
          url:"http://localhost:8080/addMember/"+boardName+"?potentialMemberEmail="+memberEmail+"&userToken="+userToken
        }
      )
      .then(
        response =>{
          console.log(response);
          let membersEmails=response.data.membersEmail;
          setmembersEmails(membersEmails);
        }
      )
      .catch(
        err =>{
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
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };
  const handleShow = () => {
    setOpenAlert(true);
  };

  const handleSearchBarInput=(event) => {
 
    if(event.code === 'Enter'){

      //send the boardName to backend to get its infos if it exists
      
      alert(event.target.value);

      let boardName=event.target.value;

      if(boardName.length!==0){


        axios(
          {
            method:"GET",
            url:"http://localhost:8080/getBoard?boardName="+boardName+"&userToken="+userToken
          }
        )
        .then(
          response =>{
            console.log(response);
            //add the board object to the state
          setBoard(response.data);
          console.log("******");
          console.log(response.data);
          console.log("******");
          //set the membersemails
          let emails= response.data.membersEmail
          setmembersEmails(emails);
        
          setBoardName(response.data.boardName); 
          setBoardExists(true)
          }
        )
        .catch(
          err =>{
            console.log(err.response);

            setOpenAlert(true);
            setErrorMessage(err.response.data.message);
            setErrorStatus(err.response.status);
          }
        )

      }

  
    }
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography className={classes.title} variant="h6" noWrap>
          {(!boardExists || isCreateBoardDialogOpen) ? "Trellox":boardName } 
          </Typography>
          {
            (boardExists && !isCreateBoardDialogOpen) && 
            <Button 
            variant="contained" 
            color="primary"
            
            >
            { isBoardPrivate?
              <LockOutlinedIcon fontSize="small"  ></LockOutlinedIcon>:
              <LockOpenOutlinedIcon fontSize="small"  />
            } 
            {isBoardPrivate ?"Private":"Public"}</Button>}
          
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for Boards..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              //onChange={(event)=> setPotentialBoardName(event.target.value) }
              onKeyPress={ handleSearchBarInput }
            />
          </div>
          <div style={{marginLeft:"50px",display:"flex"}}  >
          {
            (boardExists && membersEmails.length!==0) && 
            membersEmails.map(  (email,index) => 
               {
                  return( 
                    <Avatar
                     key={index} 
                     style={{marginLeft:"5px"}} 
                     className={classes.orange}
                     title={email} >
                     {email.charAt(0)+email.charAt(1)}
                     </Avatar>
                     )
                  
                } 
                )
          }
          {
            boardExists &&
             <Button 
             variant="contained"
              color="primary" 
              style={{marginLeft:"20px"}}
               onClick={handleAddMemberOpen} >
               Invite
               </Button>
               }
          </div>
          <div className={classes.grow} />
          
          <div className={classes.sectionDesktop}>

          <Button 
          variant="contained" 
          color="primary"
           style={{marginRight:"20px"}}
            onClick={handleClickOpen} 
             >
            Create Board
            </Button>

          <Avatar  className={classes.orange} title={userEmail} >{userEmail.charAt(0)+userEmail.charAt(1)}</Avatar>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {
        isCreateBoardDialogOpen && 
      <FormDialog 
       isOpen={isCreateBoardDialogOpen} 
       handleClose={handleClose}
       boardName={boardName}
       setBoardName={setBoardName}
       isBoardPrivate={isBoardPrivate}
       setIsBoardPrivate={setIsBoardPrivate} />
        
      }
      {
        isAddMemberDialogOpen && 
        <AddMemberDialogForm 
        open={isAddMemberDialogOpen}
        setmemberEmail={setmemberEmail}
        handleAddBoardMember={handleAddBoardMember}
        setIsAddMemberDialogOpen={setIsAddMemberDialogOpen}
         />
      }
      { errorMessage.length!==0 && 
      <Alert
       message={errorMessage} 
       status={errorStatus} 
       openAlert={openAlert} 
       handleClose={handleAlertClose}  
       handleShow={handleShow} /> 
       }  
    </div>
  );
}

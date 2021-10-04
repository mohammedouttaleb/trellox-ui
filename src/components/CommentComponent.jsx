import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';




   //commentItem design
   const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
    color: theme.palette.text.secondary,
    width:"92%",
   // marginTop:"10px",
    marginLeft:"5px"
    
  }));


export default function CommentComponent({commentElement,classes}){

    return(
        <div style={{display:"flex",marginTop:"5%"}} > 
        <Avatar  title="Board Member"  style={{marginLeft:"5px"}}    className={classes.orange}>BM</Avatar>
        <Item   >{commentElement}</Item>
        </div>
    )
}
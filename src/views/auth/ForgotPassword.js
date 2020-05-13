import React ,{useState } from 'react'
import { connect } from 'react-redux';
import {CInput, CButton} from 'Components';
import LockIcon from '@material-ui/icons/Lock';
import {signInWithFirebase} from 'Actions';
import { Typography, Box } from '@material-ui/core';
import {makeStyles} from '@material-ui/styles'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import {sendEmailforRecovery} from 'Actions';
import {useDispatch} from 'react-redux';
import {NotificationManager} from 'react-notifications';


const userStyles = makeStyles(()=>({
    content:{
        width: '80%',
        minWidth: '350px',
        margin: 'auto',
        height: '250px',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '10%',
    },
    image:{
        width:'100%',
        objectFit:'contain',
        maxHeight: 300,
    },
    wrapper: {
        display:'flex',
        flexDirection:'column',
        textAlign: 'center',
        fontWeight:'bold',
        color: 'rgb(0, 151, 62)',
        marginBottom: 20,
    },
    registerButton:{
        width: 150,
        backgroundColor:'rgb(0, 151, 62)',
        color:'white',
        marginTop: 40,
    }
}))

const ForgotPassword = (props) =>{

    const {history} = props;
    const dispatch = useDispatch();
    const classes = userStyles();

    const [email, setEmail] = useState('')

    const handleChange= (e) =>{
        setEmail(e.target.value);
    }

    const sendRecoveryEmail = ()=>{

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

        if(email === ''){
            NotificationManager.error('Email Required!');
        } else if (!reg.test(email)){
            NotificationManager.error('Invalid Email!');
        }else{
            dispatch(sendEmailforRecovery(email, history))
        }
    }

    return(
        <div>
            <img className={classes.image} src={require("Assets/img/logo.png")} alt="Logo"/>

            <div className={classes.content}>

                <Box className={classes.wrapper}>
                    <Typography variant="h6">Forgot Password</Typography>

                    <Typography variant="h5">Enter Your Registered Email</Typography>

                    <Typography variant="h5">To Setup A New Password</Typography>
                </Box>

                <CInput 
                    icon = { <LockIcon /> }
                    name="email"
                    type="text"
                    setValue={handleChange}
                    value = {email}
                    placeholder="Ente your email address"
                />

                <div  onClick={sendRecoveryEmail}>
                    <CButton 
                        title = "Send Recovery Email"
                    />
                </div>
            </div>
            <Link to="/sign-in">
                <div style={{dislplay:'flex', textAlign:'center'}}>
                    <Button className = {classes.registerButton}>Back</Button>
                </div>
            </Link>
            
        </div>
    )
}


 export default ForgotPassword;
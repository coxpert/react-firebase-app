import React ,{useState, useEffect} from 'react'
import {CInput, CButton} from 'Components';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import {signInWithFirebase} from 'Actions';
import { Typography, Button } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { NotificationManager } from 'react-notifications';

const styles = {
    content:{
        width: '80%',
        minWidth: '350px',
        margin: 'auto',
        height: '180px',
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
    forgotPasswordBos:{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30, 
        marginBottom: 30,
        color:'rgb(0, 151, 62)',
        fontSize: 14,
        fontWeight: 'bold'
    },
    registerButton:{
        maxWidth: 150,
        backgroundColor:'rgb(0, 151, 62)',
        color:'white'
    }
}
const Login = (props) =>{
    
    const {history} = props;
    const dispath = useDispatch();

    const [state, setState] = useState({email:'', password:''})

    const handleChange= (e) =>{
        setState({
            ...state,
            [e.target.name]:e.target.value,
        })
    }

    const signIn = async ()=>{
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
        const {email, password} = state;

        if(email===''){
            NotificationManager.error('Email Required!');
        }else if (password === ''){
            NotificationManager.error('Password Required!');
        }else if(!reg.test(email)){
            NotificationManager.error('Invalid Email Adress!');
        }else{
            dispath(signInWithFirebase(state, history))
        }
    }

    return(
        <div>
            <img style={styles.image} src={require("Assets/img/logo.png")} alt="Logo"/>

            <div style={styles.content}>

                <CInput
                    icon = { <EmailIcon /> }
                    name="email"
                    type="email"
                    setValue={handleChange}
                    value = {state.email}
                    placeholder="Email"
                />

                <CInput
                    icon = { <LockIcon /> }
                    name="password"
                    type="password"
                    setValue={handleChange}
                    value = {state.password}
                    placeholder="Password"
                />

                <div  onClick={signIn}>
                    <CButton 
                        title = "Log in"
                    />
                </div>
            </div>
            
            <Link to = "/forgot-password">
                <div style = {styles.forgotPasswordBos}>
                    <Typography>
                        Forgot Password
                    </Typography>
                    <ArrowRightAltIcon/>
                </div>
            </Link>

            <Link to="/register">
                <div style={{dislplay:'flex', textAlign:'center'}}>
                    <Button style={styles.registerButton}>Register Now</Button>
                </div>
            </Link>
        </div>
    )
}


 export default  Login;
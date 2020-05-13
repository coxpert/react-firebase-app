import React ,{useState } from 'react'
import {CInput, CButton} from 'Components';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import {signUpWithFirebase} from 'Actions';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {NotificationManager} from 'react-notifications'
import { useDispatch } from "react-redux";
import { Typography } from '@material-ui/core';
import {Link} from 'react-router-dom'

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
    }
}
const Register = (props) =>{

    const {history} = props;

    const [state, setState] = useState({
        email:'', 
        password:'',
        userName: '',
        fullName: '',
        confirm_password:'',
    })

    const dispatch = useDispatch();

    const handleChange= (e) =>{
        setState({
            ...state,
            [e.target.name]:e.target.value,
        })
    }

    const signUp = async ()=>{

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

        const {email, password, userName, fullName, confirm_password} = state;
        if(email===''){
            NotificationManager.error('Email Required!')
        }else if(password === ''){
            NotificationManager.error('Password Required!')
        }else if(userName === ''){
            NotificationManager.error('User Name Required!')
        }else if(fullName === ''){
            NotificationManager.error('Full Name Required!')
        }else if(!reg.test(email)){
            NotificationManager.error('Invalid Email Adreess!')
        }else if(password !== confirm_password){
            NotificationManager.error('Mistmatched Password!')
        }else{
            dispatch(signUpWithFirebase(state, history))
        }
    }
    return(
        <div>
            <img style={styles.image} src={require("Assets/img/logo.png")} alt="Logo"/>

            <div style={styles.content}>


               <div style={{marginBottom: 10}}>
                    <CInput
                        icon = { <AccountBoxIcon /> }
                        name="userName"
                        type="username"
                        setValue={handleChange}
                        value = {state.userName}
                        placeholder="User Name"
                    />
               </div>
               <div style={{marginBottom: 10}}>
                    <CInput
                        icon = { <AccountBoxIcon /> }
                        name="fullName"
                        type="text"
                        setValue={handleChange}
                        value = {state.fullName}
                        placeholder="Full Name"
                    />
                </div>
                <div style={{marginBottom: 10}}>
                    <CInput
                        icon = { <EmailIcon /> }
                        name="email"
                        type="email"
                        setValue={handleChange}
                        value = {state.email}
                        placeholder="Email"
                    />
                </div>
                <div style={{marginBottom: 10}}>
                    <CInput
                        icon = { <LockIcon /> }
                        name="password"
                        type="password"
                        setValue={handleChange}
                        value = {state.password}
                        placeholder="Password"
                    />
                </div>

                <div style={{marginBottom: 10}}>
                    <CInput
                        icon = { <LockIcon /> }
                        name="confirm_password"
                        type="password"
                        setValue={handleChange}
                        value = {state.confirm_password}
                        placeholder="Confirm Password"
                    />
                </div>
                
                <div  onClick={signUp}>
                    <CButton 
                        title = "Register"
                    />
                </div>
                
                <div style={{marginTop: 10, textAlign:'center', color:'rgb(0, 151, 62)'}}>
                    <Typography>Do you have a account already?</Typography>
                    <Link to="/sign-in">
                        <Typography>Login Now</Typography>
                    </Link>
                </div>
            </div>
        </div>
    )
}


 export default Register;
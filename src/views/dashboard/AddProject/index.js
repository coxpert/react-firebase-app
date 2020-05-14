import React, {useState} from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {CButton} from 'Components'
import {NotificationManager} from 'react-notifications'

import { useFirestore } from 'react-redux-firebase'

import CircularProgress from '@material-ui/core/CircularProgress';
import {SideBar} from 'Components'
import {useSelector} from 'react-redux'


const styles = {
    root:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        height:'100%',
    },
    header:{
        width: '100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00973e',
        height: '50px',
        position:'relative',
        fontWeight: 900,
        color: 'white',
        boxShadow:'0 0 8px 3px #0000007f'
    },
    backButton:{
        position:'absolute',
        width: '50px',
        height: '20px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        fontSize:'20px',
        left: '0px'
    },
    content:{
        marginTop: '50px',
        width: '80%',
        maxWidth: '450px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    inputBox:{
        backgroundColor:'#00000033',
        outline:'none',
        border:'none',
        marginTop: 20,
    },
    submitButtonContainer:{
        width: '60%',
        maxWidth: 300,
        marginTop: 20,
    },
    progressContaner:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100vh',
        backgroundColor:'white',
        width: '100%'
    }
}

export const AddProject = (props) =>{

    const [state, setState] = useState({
        projectName:'',
    });
    const user = useSelector(state=>state.authUser.user)
    const [loading, setLoading] = useState(false);
    const firestore = useFirestore()

    const submit = () => {
        
        if(state.projectName === ''){
            NotificationManager.error('Enter a Project Name')
        }else{
            setLoading(true);
            firestore.collection('projects').add({
                projectName: state.projectName,
                userId: user.id
            }).then(()=>{
                props.history.push('/all-project')
            })
        }
    }

    const handleChange = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    return(
        <div style={styles.root}>
            <SideBar 
                title="PROJECT DETAILS"
                backLink = "/"
            />
            {
                loading?<div style={styles.progressContaner}><CircularProgress /></div>:
                <div style={styles.content}>
                    <FormControl fullWidth variant="outlined" style={styles.inputBox}>
                        <InputLabel htmlFor="outlined-adornment-amount">Name Of Project</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            labelWidth={120}
                            value = {state.projectName}
                            name = "projectName"
                            onChange = {handleChange}
                        />
                    </FormControl>
                    <div onClick={submit} style={styles.submitButtonContainer}> 
                        <CButton title = {"Submit"} />
                    </div>
                </div>
            }
        </div>
    )
}
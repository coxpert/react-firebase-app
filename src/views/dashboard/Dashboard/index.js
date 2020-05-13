import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom'
import {Box, Typography} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {signOutWithFirebase} from 'Actions'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const styles = {
    root:{
        width:'100%',
        height: '100%',
        position:'relative',
    },
    logo:{
        maxWidth:'100%',
        maxHeight:'300px', 
    },
    addButton:{
        position:'absolute',
        left:10,
        top: '40%',
        width:'120px',
        height: '120px',
        borderRadius:'60px',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor: '#00973e',
        color:'white',
        fontSize: 20,
        fontWeight: 'bold',
        boxShadow:'0 0 8px 3px #0000007f'
    }, 
    bottomBar:{
        width:150,
        position:'absolute',
        bottom:0,
        backgroundColor:'transparent',
        color: '#00973e',
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        textAlign:'center'
    },
    bottomBarItem:{
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'rgb(0, 151, 62)',
        color:'white',
        fontWeight:'bold',
        marginBottom: 2,
        padding: '10px 5px',
    },
    logoutItem:{
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'rgb(0, 151, 62)',
        color:'white',
        fontWeight:'bold',
        marginBottom: 2,
        padding: '10px 5px',
        color:'red',
    }

}

export const Dashboard = (props) =>{

    const {history}  = props;
    const dispatch = useDispatch();

    const selectTab = (value) =>{
        if(value === 'all'){
            history.push('/all-project')
        }else if(value === 'assigned'){
            history.push('/assigned-tasks')
        }else if(value === 'signdedoff'){
            history.push('/signed-off-task')
        }else{
            history.push('/approved-tasks')
        }
    }

    const signOut = () =>{
        dispatch(signOutWithFirebase(history))
    }

    return(
        <div style={styles.root}>
            <div style={styles.logoContainer}>
                <img style={styles.logo} src={require('Assets/img/logo.png')} />
            </div>
            <Link to="/add-project">
                <div style={styles.addButton}>
                    <AddIcon />
                    Add Project
                </div>
            </Link>
            <Box style={styles.bottomBar}>
                <Box style={styles.bottomBarItem} onClick={()=>{selectTab("all")}}>
                    ALL PROJECTS
                </Box>
                <Box style={styles.bottomBarItem} onClick={()=>{selectTab("assigned")}}>
                    ASSIGNED TASKS
                </Box>
                <Box style={styles.bottomBarItem} onClick={()=>{selectTab("signdedoff")}}>
                    SIGNED OFF TASKS
                </Box>
                <Box style={styles.bottomBarItem} onClick={()=>{selectTab("approved")}}>
                    Approved Projects
                </Box>
                <Box style={styles.logoutItem} onClick={signOut}>
                   <PowerSettingsNewIcon/> <Typography>Log Out</Typography>
                </Box>
            </Box>
        </div>
    )
}
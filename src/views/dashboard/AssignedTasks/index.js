import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AssinedTaskList from './AssignedTaskList';
import {SideBar} from 'Components'

const styles = {
    root:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column'
    },
    header:{
        width: '100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        color:'black',
        backgroundColor:'#00973e',
        height: '50px',
        position:'fixed',
        fontWeight: 900,
        boxShadow:'0 0 4px 2px',
        color: 'white',
        boxShadow:'0 0 8px 3px #0000007f',
        top:0,
        maxWidth: 1024,
        margin:'auto',
        zIndex: 3,
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
    content: {
        display:'flex',
        width:'100%',
        height:'calc(100vh - 50px)',
        position:'relative',
        flexDirection:'column',
        marginTop: 50,
    } 
}

export const AssignedTasks = (props) =>{

    const back = () => {
        props.history.push('/')
    }

    return(
        <div style={styles.root}>
            <SideBar 
                title={'ASSIGNED TASKS'}
                backLink = {'/'}
            />
            <div style={styles.content}>
                <AssinedTaskList />
            </div>
        </div>
    )
}
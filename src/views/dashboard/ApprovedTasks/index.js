import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


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
        backgroundColor:'rgb(112, 173, 71)',
        height: '80px',
        position:'relative'
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
  
}

export const ApprovedTasks = (props) =>{

    const back = () => {
        props.history.push('/')
    }


    return(
        <div style={styles.root}>
            <div style={styles.header}>
                <div style={styles.backButton} onClick={back}>
                    <ArrowBackIcon />
                </div>
                <h2>APPROVED TASKS</h2>
            </div>
            <div>
kuygfku
            </div>
        </div>
    )
}
import React from 'react'
import ProjectList from './ProjectList'
import {SideBar} from 'Components'
const styles = {
    root:{
        width:'100%',
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
        position:'relative',
        width: '50px',
        height: '20px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        fontSize:'20px',
        left: '0px'
    },
    projectListContent:{
        width: '100%',
        marginTop:'50px',
    }
}

export const MyProjects = (props) =>{


    return(
        <div style={styles.root}>
            <SideBar 
                title={"ALL PROJECTS TAB"}
                backLink = {'/'}
            />
            <div style={styles.projectListContent}>
                <ProjectList />
            </div>
        </div>
    )
}
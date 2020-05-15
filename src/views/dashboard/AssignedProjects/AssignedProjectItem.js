import React from 'react'
import {Link} from 'react-router-dom'


const styles = {
    root:{
        width:'100%',
        paddingTop: 2,
    },
    row:{
        width:'100%',
        backgroundColor:'#30303022',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'50px',
        margin:'auto',
        fontSize:'20px',
        fontWeight:'bold',
        textTransform:'capitalize',
        borderRadius:'4px',
        boxShadow:'0 0 2px 1px #0000007f',
        position:'relative',
    },
    link:{
        textDecoration:'none',
    }
}

const AssignedProjectItem = (props) => {

    const {project} = props;

    return (
        <div style={styles.root}>
            <div style={styles.row}>
                <Link to={`/assigned-projects/${project.id}`} style={styles.link}>
                    <div  style={{color:'white'}}>
                        {project.projectName}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AssignedProjectItem;

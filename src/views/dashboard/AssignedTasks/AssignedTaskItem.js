import React from 'react'
import {Link} from 'react-router-dom'


const styles = {
    root:{
        width:'100%',
    },
    row:{
        width:'calc(100% - 20px)',
        backgroundColor:'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'50px',
        margin:'auto',
        marginTop:'10px',
        marginBotton:'10px',
        fontSize:'20px',
        fontWeight:'bold',
        textTransform:'capitalize',
        borderRadius:'4px',
        boxShadow:'0 0 4px 2px'
    },
    link:{
        textDecoration:'none',
    }
}

const AssignedTaskItem = (props) => {

    const {report} = props;

    return (
        <div style={styles.root}>
            <div style={styles.row}>
                <Link to={`/assigned-approve`} style={styles.link}>
                    <div>
                        {report.area}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AssignedTaskItem;

import React from 'react'
import {Link} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import {DeleteConfirmDialog} from './DeleteConfirmDialog';

const styles = {
    root:{
        width:'100%',
    },
    row:{
        width:'calc(100% - 20px)',
        backgroundColor:'#3030307f',
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
        boxShadow:'0 0 2px 1px #00000033',
        position:'relative',
    },
    link:{
        textDecoration:'none',
        color:'white'
    },
    deleteButtonContainer:{
        position:'absolute',
        right: 0,
        width: 50,
        height: '100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    deleteIcon:{
        borderRadius:'9999px',
        backgroundColor:'green',
        padding: 5,
        fontSize: 40,
        color:'#ff0000'
    }
}

const ProjectItem = (props) => {

    const {project} = props;
    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div style={styles.root}>
            <div style={styles.row}>
                <Link  to={`/report-project/${project.id}`} style={styles.link}>
                    <div>
                        {project.projectName}
                    </div>
                </Link>
                <div style={styles.deleteButtonContainer} onClick= {()=>{setOpen(true)}} >
                    <DeleteIcon style={styles.deleteIcon} />
                </div>
            </div>
            <DeleteConfirmDialog
                open = {open}
                handleClose = {handleClose}
                project = {project}
            />
        </div>
    )
}

export default ProjectItem;

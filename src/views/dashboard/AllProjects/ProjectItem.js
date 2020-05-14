import React from 'react'
import {Link} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import {DeleteConfirmDialog} from './DeleteConfirmDialog';
import ConfirmPassword from './ConfirmPassword'
import {withRouter} from 'react-router-dom'
import {useSelector} from 'react-redux'

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
        backgroundColor:'rgb(0, 151, 62)',
        padding: 5,
        fontSize: 40,
        color:'#ff0000'
    },
    deleteIconInActive:{
        borderRadius:'9999px',
        backgroundColor:'rgb(0, 151, 62, 0.5)',
        padding: 5,
        fontSize: 40,
        color:'#ff00007f'
    }
}

const ProjectItem = (props) => {

    const {project, history} = props;
    const user = useSelector(state=>state.authUser.user)
    const [open, setOpen] = React.useState(false)
    const [openpassword, setOpenPassword] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const openProjectDetail = () => {
        if(project.userId === user.id){
            history.push(`/report-project/${project.id}`)
        }else{
            setOpenPassword(true)
        }
    }

    const handleClosePassword = () =>{
        setOpenPassword(false)
    }

    return (
        <div style={styles.root}>
            <div style={styles.row}>
                <div onClick={openProjectDetail} style={{color:'white'}}>
                    {project.projectName}
                </div>
                {
                    (user.id == project .userId) ?
                    <div style={styles.deleteButtonContainer} onClick= {()=>{setOpen(true)}} >
                        <DeleteIcon style={styles.deleteIcon} />
                    </div>:
                    <div style={styles.deleteButtonContainer}>
                        <DeleteIcon style={styles.deleteIconInActive} />
                    </div>
                }
                
            </div>
            <DeleteConfirmDialog
                open = {open}
                handleClose = {handleClose}
                project = {project}
            />
            <ConfirmPassword
                open = {openpassword}
                handleClose = {handleClosePassword}
                project = {project}
            />
        </div>
    )
}

export default withRouter(ProjectItem);

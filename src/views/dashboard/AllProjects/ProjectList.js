import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import ProjectItem from './ProjectItem'
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(()=>({
    root:{
        width:'100%',
        marginTop: '60x',
    },
    progressContaner:{
        display: 'flex',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        height:'100vh',
    },
    
    addNewProject:{
        width:'50px',
        backgroundColor:'#00973e',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'50px',
        margin:'auto',
        marginTop:'10px',
        marginBotton:'10px',
        fontSize:'50px',
        fontWeight:'bold',
        color:'white',
        textTransform:'capitalize',
        borderRadius:'50%',
        boxShadow:'0 0 2px 1px #0000007f',
        position:'fixed',
        bottom: 20,
        right: 'calc(50% - 482px)',
        '@media screen and (max-width: 1024px)':{
            right: 20,
        }
    }
}))

const ProjectList = () => {
    const classes = useStyles();
    const user = useSelector(state=>state.authUser.user);
    useFirestoreConnect([{collection: 'projects'}])
    const projects = useSelector(state => state.firestore.ordered.projects) 
    console.log(projects)
    return (
        <div className={classes.root}>
            {
                projects?
                <div className={{paddingTop: 10}}>
                    {
                        projects.map((project)=>(
                            <div key={project.id}>
                                <ProjectItem project = {project} />
                            </div>
                        ))
                    }
                    <Link to="/add-project">
                        <div className={classes.addNewProject}>
                            <AddIcon style={{fontSize:'50px'}} />
                        </div>
                    </Link>
                </div>:
                <div className={classes.progressContaner}>
                    <CircularProgress />
                </div>
            }
        </div>
    )
}

export default  ProjectList;

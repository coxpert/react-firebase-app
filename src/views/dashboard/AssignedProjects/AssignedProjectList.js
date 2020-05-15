import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import AssignedProjectItem from './AssignedProjectItem'
const styles = {
    root:{
        width:'100%',
    },
    progressContaner:{
        display: 'flex',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        height:'100vh',
    },
    addNewProject:{
        width:'calc(100% - 20px)',
        backgroundColor:'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'50px',
        margin:'auto',
        marginTop:'10px',
        marginBotton:'10px',
        fontSize:'50px',
        fontWeight:'bold',
        color:'#00973e',
        textTransform:'capitalize',
        borderRadius:'4px',
        boxShadow:'0 0 4px 2px'
    }
}

const AssignedProjectList = () => {

    useFirestoreConnect([{collection: 'projects', where:['assigned', '==' , true ]}])

    const projects = useSelector(state => state.firestore.ordered.projects)

    console.log(projects)
    
    return (
        <div style={styles.root}>
            {
                projects?
                <div>
                    {
                        projects.map(project=>(
                            <div key={project.id}>
                                <AssignedProjectItem project = {project} />
                            </div>
                        ))
                    }
                </div>:
                <div style={styles.progressContaner}>
                    <CircularProgress />
                </div>
            }
        </div>
    )
}

export default  AssignedProjectList;
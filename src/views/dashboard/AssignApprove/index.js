import React from 'react'
import {SideBar} from 'Components'
import {withRouter} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useFirestoreConnect} from 'react-redux-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Assignee} from './Assignee';
import {CompleteTaskForm} from './CompleteTaskForm';

const styles = {
    root:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        height: '100%',
        backgroundColorL:'brown'
    },
    header:{
        width: '100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        color:'black',
        backgroundColor:'rgb(255, 230, 153)',
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
    fullContainer:{
        display: 'flex',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        height:'calc(100% - 50px)',
        width:'100%',
        marginTop: 50,
    },
    content: {
        width: '100%',
        height: 10,
        paddinBotton : 10,
    }
  
}

const AssignApprove = (props) =>{

    const {match} = props;
    const reportId = match.params.reportId;

    useFirestoreConnect([{collection:'reports', doc: reportId}])

    const report = useSelector(
        ({ firestore: { data } }) => data.reports && data.reports[reportId]
    )

    useFirestoreConnect([{collection: 'projects', doc:report?report.projectId:''}])

    const project = useSelector(
        ({ firestore: { data } }) => data.projects && data.projects[report?report.projectId:0]
    )


    return(
        <div style={styles.root}>
            <SideBar 
                title='ASSIGNEE'
                backLink = {`/assigned-projects/${report?report.productId:''}`}
            />
            {
                
                project?
                <div style={styles.content}>
                { 
                    report && 
                    <>
                        <Assignee report={ report } reportId={reportId} {...props}/> 
                        <CompleteTaskForm />
                    </>
                }
                </div>:
                <div style={styles.fullContainer}>
                    <div>{"Loading"}</div>
                    <CircularProgress />
                </div>
            }
        </div>
    )
}

export default withRouter(AssignApprove);
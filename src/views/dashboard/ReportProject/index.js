import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom'
import './style.scss'
import {styles} from './style'
import  ListContent  from './ListContent'

export const ReportProject = (props) =>{

    const {match} = props;
    const projectId = match.params.projectId;
    useFirestoreConnect([{collection: 'projects', doc: projectId}])
    const project = useSelector(
        ({ firestore: { data } }) => data.projects && data.projects[projectId]
      )
      
    const back = () => {
        props.history.push('/all-project')
    }

    return(
        <div style={styles.root}>
            <div style={styles.content}>
                <div style={styles.header}>
                    <div style={styles.backButton} onClick={back}>
                        <ArrowBackIcon />
                    </div>
                    <h3 style={{marginTop: 5}}>ALL PROJECT TAB</h3>
                </div>
                <div>
                    {
                        project?
                        <ListContent {...props} />:
                        <div style={styles.progressContainer}>
                            <CircularProgress />
                        </div>
                    }
                    
                </div>
                <Link to={`/snag-details/${projectId}`}>
                    <div className="fab"> + </div>
                </Link>
            </div>
        </div>
    )
}
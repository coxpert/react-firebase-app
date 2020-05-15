import React, {Fragment} from 'react'
import {styles} from './style'
import { useSelector } from 'react-redux';
import { useFirestoreConnect} from 'react-redux-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DetailContent } from './DetailContent'
import {SideBar} from 'Components'


export const ReportProjectDetail = (props) =>{

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
        <Fragment>
            {
                project?
                <div style={styles.content}>
                    <SideBar 
                        title={project.projectName}
                        backLink = {`/report-project/${report.projectId}`}
                    />
                    { report && <DetailContent report={ report } reportId={reportId} {...props}/> }
                </div>:
                <div style={styles.fullContainer}>
                    <div>{"Loading"}</div>
                    <CircularProgress />
                </div>
            }
        </Fragment>
    )
}
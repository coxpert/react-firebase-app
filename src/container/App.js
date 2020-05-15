import React  from 'react'


import { BrowserRouter as Router, Route , Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';

import { Dashboard } from 'Views/dashboard/Dashboard'
import Login  from 'Views/auth/Login'
import Register from 'Views/auth/Register'
import ForgotPassword from 'Views/auth/ForgotPassword'
import {AddProject} from 'Views/dashboard/AddProject'
import {AllProjects} from 'Views/dashboard/AllProjects'
import {ApprovedTasks} from 'Views/dashboard/ApprovedTasks'
import {AssignSubmit} from 'Views/dashboard/AssignSubmit'
import {ReportProject} from 'Views/dashboard/ReportProject'
import {SignedOffTasks} from 'Views/dashboard/SignedOffTasks'
import {SnagDetails} from 'Views/dashboard/SnagDetails'
import {ReportProjectDetail} from 'Views/dashboard/ReportProjectDetail'
import AssignApprove from 'Views/dashboard/AssignApprove'
import {MyProjects} from 'Views/dashboard/MyProjects'
import {AssignedTasks} from 'Views/dashboard/AssignedTasks/AssignedTasks';
import {AssignedProjects} from 'Views/dashboard/AssignedProjects';

const styles = {
    root: {
        width:'100%',
        maxWidth:'1024px',
        margin:'auto',
        boxShadow: '0 0 20px 5px #0000007f',
        height: '100%',
    },
}


const MainApp = (props) =>{

    const { user } = props;

    return (
        <main style={styles.root}>
            <NotificationContainer />
            <Router>
                <Switch>
                    <Route path="/log-in" exact component={Login}/>
                    <Route path="/forgot-password" exact component={ForgotPassword}/>
                    <Route path="/register" exact component={Register}/>
                    {
                        user === null &&  <Redirect to={'/log-in'} />
                    }
                    <Route path="/add-project" component={AddProject}/>
                    <Route path="/all-project" component={AllProjects}/>
                    <Route path="/my-project" component={MyProjects}/>
                    <Route path="/approved-tasks" component={ApprovedTasks}/>
                    <Route path="/assigned-approve/:reportId" component={AssignApprove}/>
                    
                    <Route path="/assigned-projects" exact component={AssignedProjects}/>
                    <Route path="/assigned-projects/:projectId" component={AssignedTasks}/>

                    <Route path="/assign-submit" component={AssignSubmit}/>

                    <Route path="/report-project/:projectId" component={ReportProject}/>
                    <Route path="/reports-project/detail/:reportId" component={ReportProjectDetail}/>

                    <Route path="/signed-off-task" component={SignedOffTasks}/>
                    <Route path="/snag-details/:projectId" component={SnagDetails}/>
                    <Route path="/" component={Dashboard}/>
                </Switch>
            </Router>
        </main>
    )
}

const mapStateToProps = ({ authUser }) => {
    const { user } = authUser;
    return { user };
 };
 
 export default connect(mapStateToProps)(MainApp);
 
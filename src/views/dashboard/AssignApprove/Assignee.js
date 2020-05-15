import React from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { styles } from './styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import {SideBar} from 'Components'
import Image from 'material-ui-image'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(()=>({
    photoWrapper:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop: 20,
        '@media screen and (max-width: 786px)':{
            flexDirection:'column',
        }
    }
}))

export const Assignee = (props) =>{

    const classes = useStyles();
    const { report, reportId} = props;
       
    return(
        <div style={styles.root}>
            <SideBar 
                title={report && report.projectName}
                backLink={`/report-project/${reportId}`}
            />
            {
                report ?
                <div  className="container bg-white" style={{display:'flex', flexDirection:'column', marginTop: 60}}>
                    <div className="date-time" style={{marginTop: '20px'}}>
                        <span>DATE AND TIME</span>
                        <strong>{report.dateTime}</strong>
                    </div>

                    <FormControl fullWidth variant="outlined" style={{marginTop: '20px'}}>
                        <InputLabel htmlFor="outlined-adornment-amount">AREA</InputLabel>
                        <OutlinedInput
                            labelWidth={40}
                            value={report.area}
                        />
                    </FormControl>

                    <FormControl fullWidth variant="outlined" style={{marginTop: '20px'}}>
                        <InputLabel htmlFor="outlined-adornment-amount">DESCRIPTION OF SNAG</InputLabel>
                        <OutlinedInput
                            labelWidth={200}
                            multiline
                            rows={5}
                            value = {report.description}
                        />
                    </FormControl>

                    <div className={classes.photoWrapper}>
                        <div>
                            <div style={{display:'flex', justifyContent:'space-between', width:'100%', maxWidth:300, margin:'auto'}}>
                                <div>
                                    PhoTo
                                </div>
                            </div>
                            <div style={styles.imagePreviewBox}>
                                <Image  
                                    src = {report.photoUrl}
                                    aspectRatio = {1}
                                />
                            </div> 
                        </div>
                       
                       <div>
                            <div style={{display:'flex', justifyContent:'space-between', width:'100%', maxWidth:300, margin:'auto'}}>
                                <div>
                                    DRAWING
                                </div>
                            </div>
                            <div style={styles.imagePreviewBox}>
                                <Image  
                                    src = {report.drawingUrl}
                                    aspectRatio = {1}
                                />
                            </div> 
                       </div>
                    </div>
                    

                    <FormControl fullWidth variant="outlined" style={{marginTop: '20px'}}>
                        <InputLabel htmlFor="outlined-adornment-amount">Assignee Name</InputLabel>
                        <OutlinedInput
                            labelWidth={200}
                            value={report.assignTo}
                        />
                    </FormControl>
                </div>:
                <div style={styles.progressContainer}>
                    <div>{loadingText}</div>
                    <CircularProgress />
                </div>
            }
        </div>
    
    )
}
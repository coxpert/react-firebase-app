import React, {useState, useRef} from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {getTheDate} from 'Helpers/helper';
import { styles } from './styles'
import { Button } from '@material-ui/core';
import { NotificationManager } from 'react-notifications'
import { useSelector } from 'react-redux';
import { useFirebase, useFirestore, useFirestoreConnect} from 'react-redux-firebase';
import { v4 as uuidv4 } from 'uuid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CameraView } from 'Components'
import {SideBar} from 'Components'
import {PhotoImage} from './PhotoImage'
import {DrawingImage} from './DrawingImage'
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";


export const SnagDetails = (props) =>{

    const {match, history} = props;
    const firebase = useFirebase()
    const firestore = useFirestore()
    const projectId = match.params.projectId;
    const cropper1 = useRef();
    const cropper2 = useRef();
    useFirestoreConnect([{collection: 'projects', doc: projectId},{collection:'reports', where:['projectId','==', projectId]}])
    const project = useSelector(
        ({ firestore: { data } }) => data.projects && data.projects[projectId]
      )

    const date = new Date()
    const [uploading, setUploading] = useState(false);
    const [loadingText, setloadingText] = useState('Lading...');

    const [state, setState] = useState({
        dateTime: getTheDate(date.getTime()/1000, 'YYYY/MM/DD h'),
        area:'',
        description:'',
        photoUrl:'',
        photoFile:'',
        drawingUrl:'',
        drawingFile:'',
        assignTo:'',
        photoCopFile:'',
        drawingCropFile:'',
        isdrawingImage:false,
    })


    const save = async (assigned) =>{

        if(state.area === ''){
            NotificationManager.error("Required the Area")
        }else{
            let data = {
                projectId: projectId,
                photoUrl: state.photoUrl,
                drawingUrl: state.drawingUrl,
                description: state.description,
                area: state.area,
                assignTo: state.assignTo,
                dateTime: state.dateTime,
                assigned: assigned,
            }

            setUploading(true)

            if(state.photoFile){
                let res = await uploadFileToFirebase(state.photoFile, 'Photo');
                if (res.isSuccess) {
                    data.photoUrl = res.url
                }else{
                    setUploading(false)
                    NotificationManager.error('Photo Image Uploading Failed')
                }
            }
            
            if (state.drawingFile) {
                let res1 = await uploadFileToFirebase(state.drawingFile, 'Drawing');
                if(res1.isSuccess){
                    data.drawingUrl = res1.url
                }else{
                    setUploading(false)
                    NotificationManager.error('Photo Image Uploading Failed')
                }
            }
                    
            firestore.collection('reports').add({...data}).then(()=>{

                firestore.collection('projects').doc(projectId).set({
                    assigned: assigned,
                },{merge: true}).then(()=>{
                    setUploading(false)
                    NotificationManager.success('Successfully Reported')
                    if(assigned){
                         history.push(`/assigned-projects`)
                    }else{
                        history.push(`/report-project/${projectId}`)
                    }
                })
                
            }).catch(error=>{
                console.log(error)
                NotificationManager.error(error.message);
            })
        }
    }

    const uploadFileToFirebase = (file, type) =>{

        return new Promise((resolve, reject) => {
            const fileName = `${uuidv4()}.${file.name.split('.').pop()}`
            firebase.storage().ref(`images/${fileName}`).put(file).on(
                "state_changed",
                (snapshot )=> {
                    setloadingText(`${type} Uploading ${Math.ceil(snapshot.bytesTransferred/snapshot.totalBytes*100)}% completed`)
                },
                (error) => {
                    console.log(error);
                    setUploading(false)
                    reject({url: null, isSuccess: false})
                },
                ()=>{
                    console.log('success')
                    firebase.storage()
                    .ref("images/")
                    .child(fileName)
                    .getDownloadURL()
                    .then((url) => {
                        console.log('success')
                        resolve({url: url, isSuccess: true})
                    })
                }
            )
        })
    }
        

    const assign = () => {
        if (state.description === ''){
            NotificationManager.error("Fill in the Description of SNAG")
        }else if (state.assignTo === ''){
            NotificationManager.error("Fill in the AssignTo field")
        }else if (state.photoUrl === ''){
            NotificationManager.error("Choose a Photo")
        }else if (state.drawingUrl === ''){
            NotificationManager.error("Choose a Drawing")
        }else{
            save(true);
        }
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const isImage = (type) => {
        // /image*/.test()
    }

    const [isopenCamera, setOpenCamera] = React.useState(false)

    const openCamera = () =>{
        setOpenCamera(true)
    }

    return(
        isopenCamera?<div>
            <MobileView>
                <CameraView />
            </MobileView>
            <BrowserView>
                asdfasdfasdfasdfasdf
            </BrowserView>
        </div>:
        <div style={styles.root}>
            <SideBar 
                title={project && project.projectName}
                backLink={`/report-project/${projectId}`}
            />
            {
                project && (!uploading) ?
                <div  className="container bg-white" style={{display:'flex', flexDirection:'column', marginTop: 60}}>
                    <div className="date-time" style={{marginTop: '20px'}}>
                        <span>DATE AND TIME</span>
                        <strong>{state.dateTime}</strong>
                    </div>

                    <FormControl fullWidth variant="outlined" style={{marginTop: '20px'}}>
                        <InputLabel htmlFor="outlined-adornment-amount">AREA</InputLabel>
                        <OutlinedInput
                            labelWidth={40}
                            value={state.area}
                            name="area"
                            onChange = {handleChange}
                        />
                    </FormControl>

                    <FormControl fullWidth variant="outlined" style={{marginTop: '20px'}}>
                        <InputLabel htmlFor="outlined-adornment-amount">DESCRIPTION OF SNAG</InputLabel>
                        <OutlinedInput
                            labelWidth={200}
                            multiline
                            rows={5}
                            value = {state.description}
                            name = "description"
                            onChange = {handleChange}
                        />
                    </FormControl>

                    <PhotoImage state={state} setState={setState} />

                    <DrawingImage  state={state} setState={setState} />

                    <FormControl fullWidth variant="outlined" style={{marginTop: '20px'}}>
                        <InputLabel htmlFor="outlined-adornment-amount">Assignee Name</InputLabel>
                        <OutlinedInput
                            labelWidth={200}
                            value={state.assignTo}
                            name = "assignTo"
                            onChange = {handleChange}
                        />
                    </FormControl>

                    <div style={styles.buttonContaner}>
                        <Button variant="contained" color="primary" onClick={()=>{save(false)}}>SAVE</Button>
                        <Button variant="contained" color="primary"onClick={()=>{assign()}} >ASSIGN </Button>
                    </div>
                </div>:
                <div style={styles.progressContainer}>
                    <div>{loadingText}</div>
                    <CircularProgress />
                </div>
            }
        </div>
    
    )
}
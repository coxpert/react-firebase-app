import React, {useState, useRef, useEffect, Fragment} from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {getTheDate} from 'Helpers/helper';
import {styles} from './style'
import Cropper from 'react-cropper';
import Image from 'material-ui-image'
import BackupIcon from '@material-ui/icons/Backup';
import CropIcon from '@material-ui/icons/Crop';
import CachedIcon from '@material-ui/icons/Cached';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';
import { NotificationManager } from 'react-notifications'
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { v4 as uuidv4 } from 'uuid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dropzone from 'react-dropzone'
import { CameraView } from 'Components'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export const DetailContent = (props) =>{

    const {report, reportId } = props;
    const firebase = useFirebase()
    const firestore = useFirestore()
    const cropper1 = useRef();
    const cropper2 = useRef();
    const date = new Date();
    const [photoCroping, setPhotoCroping] = useState(false)
    const [drawingCroping, setDrawingCroping] = useState(false)
    const [uploading, setUploading] = useState(false);
    const [loadingText, setloadingText] = useState('Lading...');
    

    const [state, setState] = useState({
        dateTime: getTheDate(date.getTime()/1000, 'YYYY/MM/DD h:m:s'),
        area:report.area,
        description:report.description,
        photoUrl: report.photoUrl,
        photoFile: '',
        drawingUrl:report.drawingUrl,
        drawingFile: '',
        assignTo: report.assignTo,
    })


    const crop = () => {
        // console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    }

    const handlePhoto = (e) =>{
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
    
  
        reader.onloadend = () => {
          setState({
            ...state,
            photoFile: file,
            photoUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
    }
    

    const handleDrawing = (e) =>{
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        
        reader.onloadend = () => {
            setState({
                ...state,
                drawingFile: file,
                drawingUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    const save = async (assigned) =>{
        if(state.area === ''){
            NotificationManager.error("Required the Area")
        }else{
            let data = {
                projectId: report.projectId,
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
                    
            firestore.collection('reports').doc(reportId).set({...data},{merge: true}).then(()=>{
                setUploading(false)
                NotificationManager.success('Successfully Updated')
                if(assigned){
                   props.history.push(`/assigned-tasks`) 
                }
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

    const onDrop1 = (files) => {
        const reader = new FileReader()
        reader.onload = () => {
            setState({
                ...state,
                photoFile: files[0],
                photoUrl: reader.result
              });
        }
        reader.readAsDataURL(files[0])
    }
    
    const onDrop2 = (files) => {
        const reader = new FileReader()
        console.log(files[0].type);
        reader.onload = () => {
            setState({
                ...state,
                drawingFile: files[0],
                drawingUrl: reader.result
            });
        }
        reader.readAsDataURL(files[0])
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);

    const handleClick1 = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl(null);
    };
        
    
    const handleClick2 = (event) => {
        setAnchorE2(event.currentTarget);
    };

    const handleClose2  = () => {
        setAnchorE2(null);
    };

    const [isopenCamera, setOpenCamera] = React.useState(false)

    const openCamera = () =>{
        setOpenCamera(true)
    }


    return(
        <Fragment>
            {
                (!uploading) ?
                <div  className="container bg-white" style={{display:'flex', flexDirection:'column'}}>
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


                    <div style={{ marginTop: '20px'}}>
                        <div style={{display:'flex', justifyContent:'space-between', width:'100%', maxWidth:300, margin:'auto'}}>
                            <div>
                                PHOTO
                            </div>
                            <div style={{display:'flex',width:'fit-content', alignItems:'center', border:'solid 1px #9090907f', borderRadius:'4px', marginBottom:'2px'}}>
                                <div>
                                    <div aria-controls="simple-menu" aria-haspopup="true"  onClick={handleClick1} >
                                        <BackupIcon style={styles.icon}/>
                                    </div>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose1}
                                    >
                                        <MenuItem >
                                            <label htmlFor="photo">Browse</label>
                                            <input id='photo' hidden type="file" accept="images/*" onChange={handlePhoto}/>
                                        </MenuItem>
                                        <MenuItem onClick={openCamera} >Camera</MenuItem>
                                    </Menu>
                                </div>
                                    <Divider orientation="vertical" />
                                
                                    <div onClick={()=>{setPhotoCroping(!photoCroping)}}><CropIcon style={styles.icon}  /></div>
                                
                            </div>
                        </div>
                         <div>
                            {!state.photoUrl && <Dropzone onDrop={onDrop1} accept="image/*">
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()}  style={styles.imageBox}>
                                        <input {...getInputProps()} />
                                        <Image 
                                            src={require('Assets/img/add-file.svg')} 
                                            aspectRatio = {1}
                                        />
                                    </div>
                                )}
                            </Dropzone>}
                        </div>
                        {

                            state.photoUrl && (photoCroping?
                            <ReactCropper
                                ref={cropper1}
                                src={state.photoUrl} 
                                style={styles.imagePreviewBox}
                                guides={false}
                                crop={crop1} 
                                rotatable = {true}
                            />:
                            <div style={styles.imagePreviewBox}>
                                <Image 
                                    src={state.photoUrl} 
                                    aspectRatio = {1}
                                />
                            </div>  )
                        }
                    </div>
                
                
                    <div style={{ marginTop: '20px'}}>
                        <div style={{display:'flex', justifyContent:'space-between', width:'100%', maxWidth:300, margin:'auto'}}>
                            <div>
                                DRAWING
                            </div>
                            <div style={{display:'flex',width:'fit-content', alignItems:'center', border:'solid 1px #9090907f', borderRadius:'4px', marginBottom:'2px'}}>
                                <div>
                                    <div aria-controls="simple-menu" aria-haspopup="true"  onClick={handleClick2} >
                                        <BackupIcon style={styles.icon}/>
                                    </div>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorE2}
                                        keepMounted
                                        open={Boolean(anchorE2)}
                                        onClose={handleClose2}
                                    >
                                        <MenuItem >
                                            <label htmlFor="drawing">Browse</label>
                                            <input id='drawing' hidden type="file" accept="images/*" onChange={handleDrawing}/>
                                        </MenuItem>
                                        <MenuItem onClick={openCamera} >Camera</MenuItem>
                                    </Menu>
                                </div>
                                <Divider orientation="vertical" />
                                
                                <div onClick={()=>{setDrawingCroping(!photoCroping)}}><CropIcon style={styles.icon}  /></div>
                                    
                                <Divider orientation="vertical" />
                                {state.isdrawingImage && <div onClick={()=>{setDrawingCroping(!drawingCroping)}}><CropIcon style={styles.icon}  /></div>}
                            </div>
                        </div>
                        <div>
                            {!state.drawingUrl && <Dropzone onDrop={onDrop2}>
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()}  style={styles.imageBox}>
                                        <input {...getInputProps()} />
                                        <Image 
                                            src={require('Assets/img/add-file.svg')} 
                                            aspectRatio = {1}
                                        />
                                    </div>
                                )}
                            </Dropzone>}
                        </div>
                        {
                            state.drawingUrl && ( drawingCroping?
                            <ReactCropper
                                ref={cropper2}
                                src={state.drawingUrl} 
                                style={styles.imagePreviewBox}
                                guides={false}
                                crop={crop2} 
                                rotatable = {true}
                            />:
                            <div style={styles.imagePreviewBox}>
                                <Image 
                                    src={state.drawingUrl} 
                                    aspectRatio = {1}
                                />
                            </div> )
                        }
                    </div>

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
                        <Button variant="contained" color="primary"onClick={()=>{assign()}} disabled={report.assigned}>ASSIGN </Button>
                    </div>
                </div>:
                <div style={styles.progressContainer}>
                    <div>{loadingText}</div>
                    <CircularProgress />
                </div>
            }
        </Fragment>
    )
}
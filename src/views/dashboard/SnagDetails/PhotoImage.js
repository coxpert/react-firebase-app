import React, {useState, useRef} from 'react'
import { styles } from './styles'
import ReactCropper from 'react-cropper';
import  ReactImage from 'material-ui-image'
import BackupIcon from '@material-ui/icons/Backup';
import CropIcon from '@material-ui/icons/Crop';
import Divider from '@material-ui/core/Divider';
import Dropzone from 'react-dropzone'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CanvasDraw from "react-canvas-draw";
import SaveIcon from '@material-ui/icons/Save';
import {NotificationManager} from 'react-notifications'

export const PhotoImage = (props) =>{

    const cropper1 = useRef();
    let photoCanvas = useRef();

    const [photoCroping, setPhotoCroping] = useState(false)

    const handlePhoto = (e) =>{
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
        props.setState({
            ...props.state,
            photoFile: file,
            photoUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
    }
    

    const onDrop1 = (files) => {
        const reader = new FileReader()
        reader.onload = () => {
            props.setState({
                ...props.state,
                photoFile: files[0],
                photoUrl: reader.result
              });
        }
        reader.readAsDataURL(files[0])
    }
    

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick1 = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl(null);
    };
        

    const [isopenCamera, setOpenCamera] = React.useState(false)

    const openCamera = () =>{
        setOpenCamera(true)
    }

    const canvasClear = () =>{
        photoCanvas.clear()
        let img = new Image();
        img.src = props.state.photoUrl;
        const canvas = photoCanvas.ctx.drawing.canvas;
        const ctx = canvas.getContext("2d");
        img.onload = function(){
            ctx.drawImage(img, 0, 0, 300, 300);
        }
    }

    const savePhotoImage= () => {
        if(photoCroping){
            props.setState({
                ...props.state,
                photoUrl: cropper1.current.getCroppedCanvas().toDataURL()
            }) 
            setPhotoCroping(false); 
        }else{
           const canvas = photoCanvas? photoCanvas.ctx.drawing.canvas: null;
            props.setState({
                ...props.state,
                photoFile: null,
                photoUrl: canvas.toDataURL("image/png")
            })   
        }

        NotificationManager.info('Photo Image Saved!') 
    }

    const getPhotoCanvas = (CanvasDraw)=>{
        photoCanvas = CanvasDraw;
        setTimeout(function(){
            let img = new Image();
            img.src = props.state.photoUrl;
            const canvas = photoCanvas? photoCanvas.ctx.drawing.canvas: null;
            if(canvas){
                const ctx = canvas.getContext("2d");
                img.onload = function(){
                    ctx.drawImage(img, 0, 0, 300, 300);
                }
            }
        }, 100)
    }

    return(
        <>
            <div style={{ marginTop: '20px'}}>
                <div style={{display:'flex', justifyContent:'space-between', width:'100%', maxWidth:300, margin:'auto'}}>
                    <div> PHOTO </div>
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
                        {
                            !photoCroping && props.state.photoUrl &&
                            <>
                                <Divider orientation="vertical" />
                                <div onClick={()=>{setPhotoCroping(!photoCroping)}}><CropIcon style={styles.icon}  /></div>
                            </>
                        }
                        {
                            props.state.photoUrl &&
                            <>
                                <Divider orientation="vertical" />
                                <div onClick={()=>{savePhotoImage()}}><SaveIcon style={styles.icon}  /></div>
                            </>
                        }
                    </div>
                </div>
                
                <div>
                    {!props.state.photoUrl && <Dropzone onDrop={onDrop1} accept="image/*">
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}  style={styles.imageBox}>
                                <input {...getInputProps()} />
                                <ReactImage 
                                    src={require('Assets/img/addphoto.png')} 
                                    aspectRatio = {1}
                                />
                            </div>
                        )}
                    </Dropzone>}
                </div>
                {

                    props.state.photoUrl && (photoCroping?
                    <ReactCropper
                        ref={cropper1}
                        src={props.state.photoUrl} 
                        style={styles.imagePreviewBox}
                        guides={false}
                        rotatable = {true}
                    />:
                    <div style={styles.imagePreviewBox}>
                        <CanvasDraw  
                            ref = {getPhotoCanvas}
                            canvasWidth = {300}
                            canvasHeight = {300}
                            lazyRadius = {0}
                            brushRadius = {2}
                            brushColor = {"#FFFF00"}
                            catenaryColor = {"#FFFF00"}
                        />
                    </div>  )
                }
            </div>
        </>
    )
}
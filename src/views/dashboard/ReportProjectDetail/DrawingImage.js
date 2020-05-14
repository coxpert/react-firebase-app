import React, {useState, useRef, useEffect} from 'react'
import { styles } from './styles'
import ReactCropper from 'react-cropper';
import BackupIcon from '@material-ui/icons/Backup';
import CropIcon from '@material-ui/icons/Crop';
import Divider from '@material-ui/core/Divider';
import Dropzone from 'react-dropzone'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Typography} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import {NotificationManager} from 'react-notifications'


const Canvas = (props) =>{
    useEffect(()=>{
        const ctx = props.canvas.current.getContext('2d');
        const image = new Image();
        image.src = props.state.drawingUrl;
        image.onload = function(){
            ctx.drawImage(image, 0, 0, 300, 300);
            props.setState({
                ...props.state,
                drawingUrl: props.canvas.current.toDataURL("image/png")
            })
        }
    }, [])

    const drawMark = (e) =>{
        const ctx = props.canvas.current.getContext('2d');
        const image = new Image();
        image.src = require('Assets/img/location.png')
        const x = e.pageX - props.canvas.current.offsetParent.offsetLeft;
        const y = e.pageY - props.canvas.current.offsetParent.offsetTop;
        image.onload = function(){
            ctx.drawImage(image, x, y, 40, 40);
        }
        setTimeout(function(){
            props.setState({
                ...props.state,
                drawingUrl: props.canvas.current.toDataURL("image/png")
            })
        }, 1000)
    }
    return (
        <>
            <canvas ref={props.canvas} width={300} height={300} onClick={drawMark}> </canvas>
        </>
    )
}
export const DrawingImage = (props) =>{

    const [drawingCroping, setDrawingCroping] = useState(false)
    const cropper2 = useRef();
    const drawCanvas = useRef()
    const handleDrawing = (e) =>{
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        
        console.log(file.type);

        reader.onloadend = () => {
            props.setState({
                ...props.state,
                drawingFile: file,
                drawingUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }    

    const onDrop2 = (files) => {
        const reader = new FileReader()
        console.log(files[0].type);
        reader.onload = () => {
            props.setState({
                ...props.state,
                drawingFile: files[0],
                drawingUrl: reader.result
            });
        }
        reader.readAsDataURL(files[0])
    }


    const [anchorE2, setAnchorE2] = React.useState(null);
    
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

    const savePhotoImage= () => {
        if(drawingCroping){
            props.setState({
                ...props.state,
                drawingUrl: cropper2.current.getCroppedCanvas().toDataURL(),
                drawingFile: null,
            }) 
            setDrawingCroping(false); 
        }else{
            props.setState({
                ...props.state,
                drawingFile: null,
                drawingUrl: drawCanvas.current.toDataURL('image/png')
            })   
        }
        NotificationManager.info('Drawing Image Saved!') 
    }


    return(
        <>
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
                        {
                            !drawingCroping && props.state.drawingUrl &&
                            <>
                                <Divider orientation="vertical" />
                                <div onClick={()=>{setDrawingCroping(!drawingCroping);}}><CropIcon style={styles.icon}  /></div>
                            </>
                        }
                        {
                            props.state.drawingUrl &&
                            <>
                                <Divider orientation="vertical" />
                                <div onClick={()=>{savePhotoImage()}}><SaveIcon style={styles.icon}  /></div>
                            </>
                        }
                    </div>
                </div>

                <div>
                    {!props.state.drawingUrl && <Dropzone onDrop={onDrop2}>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}  style={styles.imageBox}>
                                <input {...getInputProps()} />
                                <div style = {styles.addphoto}>
                                    <AddIcon  style={{fontSize: 30, fontWeight: 'bold'}} />
                                    <Typography  style={{fontSize: 30, fontWeight: 'bold'}}>Add Drawing</Typography>
                                </div>
                            </div>
                        )}
                    </Dropzone>}
                </div>
                {
                    props.state.drawingUrl && ( drawingCroping?
                    <ReactCropper
                        ref={cropper2}
                        src={props.state.drawingUrl} 
                        style={styles.imagePreviewBox}
                        guides={false}
                        rotatable = {true}
                    />:
                    <div style={styles.imagePreviewBox}>
                        <Canvas  
                            canvas = {drawCanvas}
                            state = {props.state}
                            setState = {props.setState}
                        />
                    </div> )
                }
            </div>

        </>
    
    )
}
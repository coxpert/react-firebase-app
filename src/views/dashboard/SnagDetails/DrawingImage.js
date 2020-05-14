import React, {useState, useRef, useEffect} from 'react'
import {getTheDate} from 'Helpers/helper';
import { styles } from './styles'
import ReactCropper from 'react-cropper';
import Image from 'material-ui-image'
import BackupIcon from '@material-ui/icons/Backup';
import CropIcon from '@material-ui/icons/Crop';
import Divider from '@material-ui/core/Divider';
import Dropzone from 'react-dropzone'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export const DrawingImage = (props) =>{

    const [drawingCroping, setDrawingCroping] = useState(false)
    const  canvas = useRef();
    const cropper2 = useRef();
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

    useEffect(()=>{
        
        if(props.state.drawingUrl && canvas.current && canvas.current.canvas){
            const ctx = canvas.current.canvas.getContext('2d');
            var imageObj1 = new Image();
            imageObj1.src = 'https://i.pinimg.com/236x/d7/b3/cf/d7b3cfe04c2dc44400547ea6ef94ba35.jpg'
            imageObj1.onload = function(){
                ctx.drawImage(imageObj1,0, 0);
            }
        }
    })

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
                        <Divider orientation="vertical" />
         
                        {props.state.drawingUrl && <div onClick={()=>{setDrawingCroping(!drawingCroping)}}><CropIcon style={styles.icon}  /></div>}

                    </div>
                </div>

                <div>
                    {!props.state.drawingUrl && <Dropzone onDrop={onDrop2}>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}  style={styles.imageBox}>
                                <input {...getInputProps()} />
                                <Image 
                                    src={require('Assets/img/adddraw.png')} 
                                    aspectRatio = {1}
                                />
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
                        <canvas ref={canvas} width={300} height={300}> </canvas>
                    </div> )
                }
            </div>

        </>
    
    )
}
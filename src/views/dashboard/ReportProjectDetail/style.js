export const styles = {
    root:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column'
    },
    content:{
        width:'100%',
    },
    header:{
        width: '100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        color:'black',
        backgroundColor:'#00973e',
        height: '50px',
        position:'fixed',
        fontWeight: 900,
        boxShadow:'0 0 4px 2px',
        color: 'white',
        boxShadow:'0 0 8px 3px #0000007f',
        top:0,
        maxWidth: 1024,
        margin:'auto',
        zIndex: 3,
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
    progressContainer:{
        display: 'flex',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        height:'calc(100vh - 50px)',
        width:'100%',
        marginTop: 50,
    },

    fullContainer:{
        display: 'flex',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        height:'100vh',
        width:'100%',
    },
    
    icon:{
        margin: '2px 10px',
    },
    buttonContaner:{
        display:'flex',
        width:'100%',
        justifyContent:'space-around',
        marginTop: 20,
        marginBottom: 50,
    },
    imageBox:{
        height: 300, 
        width: 300, 
        border:'solid 1px #8080807f', 
        margin:'auto',
        padding: 80,
    },
    imagePreviewBox:{
        height: 300, 
        width: 300, 
        border:'solid 1px #8080807f', 
        margin:'auto',
    }
}

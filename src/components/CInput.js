import React from 'react'
const styles = {
    root:{
        width: '100%',
        borderRadius:'99999px',
        backgroundColor:'#00000033',
        display: 'flex',
        overflow: 'hidden',
        height: '40px'
    },
    input:{
        backgroundColor:'transparent',
        width:'100%',
        outline:'none',
        border:'none',
        paddingLeft:'5px',
        color:'white',
        '::placeholder':{
            color:'white'
        }
    },
    iconContainer:{
        width: '60px',
        backgroundColor:'black',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        color:'#00973e',
    },
    icon: {
        color:'#00973e'
    }
}

export const CInput = (props) =>{
    const {name, value, setValue, type, placeholder, icon} = props;
    return(
        <div style={styles.root}>
            <div style={styles.iconContainer}>
                { icon }
            </div>
            <input 
                style={styles.input} 
                value={value} 
                onChange={setValue} 
                name={name} 
                type={type}
                placeholder={placeholder}
            />
        </div>
    )
}
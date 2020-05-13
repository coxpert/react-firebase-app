import React from 'react'

const styles = {
    root: {
        width:'100%',
    },

    button:{
        width: '100%',
        height: '40px',
        borderRadius: '5px',
        backgroundColor:'#00973e',
        color: 'white',
        border: 'none',
        outline: 'none',
        fontFamily:'Source Sans Pro',
        fontSize:'20px',
        fontWeight: 'bold'
    }
}

export const CButton = (props) =>{

    const {title} = props;

    return (
        <div style={styles.root}>
            <button style = {styles.button} >{title}</button>
        </div> 
    )

}
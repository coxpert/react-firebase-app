import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFirestoreConnect } from 'react-redux-firebase'
import { NotificationManager } from 'react-notifications';
import { useSelector } from 'react-redux'

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { withRouter } from 'react-router-dom'

const styles = {
    inputBox: {
        backgroundColor: '#00000000',
        outline: 'none',
        border: 'none',
        marginTop: 20,
    },
}

const ConfirmPassword = (props) => {

    const { open, handleClose, project, history } = props;
    useFirestoreConnect([{ collection: 'users', where: ['id', '==', project.userId ?? 'userId'] }])
    const user = useSelector(state => state.firestore.ordered.users)

    const [password, setPassword] = useState('');
    const handleChange = (e) => {
        setPassword(e.target.value)
    }

    const confirmPassword = () => {

        if (user[0].password === password) {
            history.push(`/report-project/${project.id}`)
        } else {
            NotificationManager.error('You are not allowed to accees this project')
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Enter the Password</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth variant="outlined" style={styles.inputBox}>
                        <InputLabel htmlFor="outlined-adornment-amount">Enter the Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            labelWidth={120}
                            value={password}
                            name="password"
                            type="password"
                            onChange={handleChange}
                        />
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmPassword} color="secondary">
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default withRouter(ConfirmPassword)
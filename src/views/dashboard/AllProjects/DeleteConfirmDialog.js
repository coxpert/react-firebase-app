import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFirestore } from 'react-redux-firebase'
import {NotificationManager} from 'react-notifications';

export const DeleteConfirmDialog = (props) => {

    const {open, handleClose, project} = props;
    const firestore = useFirestore()
    const handleDelete = () => {
        firestore.collection('projects').doc(`${project.id}`).delete()
        NotificationManager.success('Deleted Successfully!');
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Delete Project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you really delete it?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
import React from 'react'
import { Container, Typography, Button, AppBar, Toolbar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import HomeIcon from '@material-ui/icons/Home';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DateRangeIcon from '@material-ui/icons/DateRange';
import UploadIcon from '@material-ui/icons/CloudUpload'
import { DropzoneArea } from 'material-ui-dropzone';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({

    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },

    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}));


const MobileBar = () => {
    const classes = useStyles()

    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState([]);


    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    };

    const handleFile = (files) => {
        setFile(files)
    }
    return (
        <>
            <Hidden smUp>
                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar variant='dense' className={classes.toolbar}>
                        <IconButton color="inherit" aria-label="open drawer">
                            <HomeIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <PeopleAltIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <DateRangeIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={handleClickOpen}>
                            <CloudUploadIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">{""}</DialogTitle> */}
                    <DialogContent>
                        <DropzoneArea
                            acceptedFiles={['image/*', 'pdf/*', 'application/*']}
                            onChange={handleFile}
                            showFileNames
                            dropzoneText="Tap or drag file to this area to upload"
                            showAlerts={false}
                            filesLimit={1}
                        />
                        <DialogContentText id="alert-dialog-description">
                            Add new PDF material to the library
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Upload
                        </Button>
                    </DialogActions>
                </Dialog>
            </Hidden>
        </>

    )
}

export default MobileBar
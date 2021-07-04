import React from 'react'
import { Button, AppBar, Toolbar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import HomeIcon from '@material-ui/icons/Home'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { DropzoneArea } from 'material-ui-dropzone'
import Link from 'next/link'
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase, { auth, db } from '../../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

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
    },
    dialogContent: {
        padding: theme.spacing(4),
        minWidth: theme.spacing(32),
    },
    dialogtitle: {
        color: theme.palette.secondary,
        textAlign: 'center',
        paddingTop: theme.spacing(2)
    },
    dialogContentText: {
        fontSize: theme.spacing(1.5),
        textAlign: 'center',
    },
    dropzoneArea: {
        backgroundColor: 'red',
        paddingTop: theme.spacing(2),
    },
}))


const MobileBar = () => {
    const classes = useStyles()
    const [user, loading, error] = useAuthState(auth)
    const [stories, storiesLoading, storiesError] = useCollection(db.collection('stories'), {})

    const [open, setOpen] = React.useState(false)
    const [file, setFile] = React.useState([])


    // if (!storiesLoading && stories) {
    //     stories.docs.map((doc) => console.log(doc.data()))
    // }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleFile = (fileentry) => {
        console.log(fileentry)

        if (fileentry) {
            setFile(fileentry[0])
        }
    }

    const handleSubmit = async () => {
        if (!file) {
            return
        }
        handleClose()
        const storageRef = firebase.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        const fileUrl = await fileRef.getDownloadURL()

        const stories = {
            author: user.displayName,
            author_id: user.uid,
            author_avatar: user.photoURL,
            file: fileUrl,
            file_name: file.name,
            title: 'Introduction',
            thumbnail: fileUrl,
            content: 'This is an introduction to the beginning and the end'
        }


        switch (file.type) {
            case "application/pdf":
                // return await db.collection('materials').doc(user.uid).set({ materials: stories })
                return await db.collection('materials').add({ ...stories })

            default:
                // return await db.collection('stories').doc(user.uid).set({ stories })
                return await db.collection('stories').add({ ...stories })

        }




    }

    return (
        <Hidden smUp>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar variant='dense' className={classes.toolbar}>
                    <Link href="/#" >
                        <IconButton color="inherit" aria-label="open drawer">
                            <HomeIcon />
                        </IconButton>
                    </Link>
                    <Link href="/#" >
                        <IconButton color="inherit">
                            <PeopleAltIcon />
                        </IconButton>
                    </Link>
                    <Link href="/calendar" >
                        <IconButton color="inherit">
                            <DateRangeIcon />
                        </IconButton>
                    </Link>
                    <IconButton color="inherit" onClick={handleClickOpen}>
                        <CloudUploadIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" className={classes.dialogtitle}>UPLOAD FILES</DialogTitle>
                <DialogContentText id="alert-dialog-description" className={classes.dialogContentText}>
                    Upload documents you want to share.
                </DialogContentText>
                <DialogContent className={classes.dialogContent}>
                    <DropzoneArea
                        className={classes.dropzoneArea}
                        acceptedFiles={['image/*', 'pdf/*', 'application/*']}
                        onChange={handleFile}
                        showFileNames
                        dropzoneText="Tap or drag file"
                        showAlerts={false}
                        filesLimit={1}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </Hidden>
    )
}

export default MobileBar
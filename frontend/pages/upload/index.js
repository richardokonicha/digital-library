import React from 'react'
import { Container, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core'
import Copyright from '../../src/components/Copyright'
import Header from '../../src/components/Header'
import Reading from '../../src/components/Reading'
import Link from 'next/link'

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(4),
        // backgroundColor: theme.palette.secondary.light,
        position: 'relative'

    },


}))


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#096C3A',
            main: '#096C3A',
            dark: '#096C3A',
        },
        secondary: {
            light: '#5b5b5b',
            main: '#333333',
            grey: '#FFFFFFA1',
        },
        text: {
            light: '#B0B3B8',
            main: '#E4E6EB',
            dark: '#000000',
        },
    },

});

export default function Home() {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Header />

            <Container>

                <Container maxWidth="md">
                    <Box display="flex" m={2} justifyContent="space-around" flexDirection='row'  >
                        <Box >
                            <Link href="/#" >
                                <Button color="inherit" className={classes.btn}>Home</Button>
                            </Link>
                        </Box>
                        <Box >
                            <Link href="/class" >
                                <Button color="inherit" className={classes.btn}>My classes</Button>
                            </Link>
                        </Box>
                        <Box >
                            <Link href="/calender" >
                                <Button color="inherit" className={classes.btn}>Academic calender</Button>
                            </Link>
                        </Box>
                        <Box >
                            <Link href="/upload" >
                                <Button color="inherit" className={classes.btn}>Create uploads</Button>
                            </Link>

                        </Box>
                    </Box>
                </Container>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Open alert dialog
                  </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

            </Container>
        </ThemeProvider>
    )
}
import { Link, Paper, Box, Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GoogleSvg from "./googleIcon.svg"
import { auth, provider } from '../../firebase/clientApp'
import { useRouter } from 'next/router'


const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(10, 0),
        padding: theme.spacing(20, 2),
        border: '2px red solid',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
        minWidth: theme.spacing(60)
    },

}))

const SignInSide = () => {
    const classes = useStyles()
    const router = useRouter()

    const signinWithGoogle = async () => {
        return await auth
            .signInWithPopup(provider)
            .then((response) => {
                router.push('/')
            })
    }

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} >

                <Box className={classes.paper} display="flex" flexDirection="column" alignItems="center" >
                    <GoogleSvg />
                    <Button
                        size='large'
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={signinWithGoogle}
                    >
                        Sign In
                    </Button>

                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Box>

            </Grid>
        </Grid>
    )
}

export default SignInSide
import { Link, Paper, Box, Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GoogleSvg from "./googleIcon.svg"
import { auth, provider } from '../../firebase/clientApp'
import { useRouter } from 'next/router'
import { useSpring, animated } from 'react-spring'
import { useMorph } from 'react-morph'
import { useState } from 'react'

const AButton = animated(Button)
const AGoogleSvg = animated(GoogleSvg)

const SignInSide = () => {
    const classes = useStyles()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [flip, set] = useState(false)

    const signinWithGoogle = async () => {
        setLoading(true)
        return await auth
            .signInWithPopup(provider)
            .then((response) => {
                router.push('/')
            })
    }

    const contentAnimation = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0.2 },
        reset: true,
        reverse: flip,
        delay: 700,
        onRest: () => set(!flip),
    })

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} >
            </Grid>
            <Grid item xs={12} sm={8} md={5} elevation={6} >
                <Box className={classes.paper} display="flex" flexDirection="column" alignItems="center" >
                    {loading ? <AGoogleSvg style={contentAnimation} className={classes.svg} /> : <GoogleSvg className={classes.svg} />}
                    <Button
                        size='large'
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={signinWithGoogle}>
                        Sign In to library
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


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?engineering)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(12, 4),
        padding: theme.spacing(20, 2),
        border: '2px grey solid',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(10, 0, 2),
        padding: theme.spacing(2, 4),
    },
}))

const Copyright = () => {
    const fader = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0 }
    })
    return (
        <animated.div style={fader}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                    Mechanical Engineering Library
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </animated.div>
    )
}
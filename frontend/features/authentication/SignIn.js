import React from 'react';
import { useCookies } from "react-cookie";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { SvgIcon, FormControlLabel } from '@material-ui/core';
import GoogleSvg from "./googleIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./authenticationSlice"

const GoogleIcon = (props) => {
    return (
        <SvgIcon component={GoogleSvg} {...props}>
        </SvgIcon>
    );
}

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
    );
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
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignInSide = () => {
    const classes = useStyles();
    const [cookies, setCookie] = useCookies(["x-access-token"]);
    const { count } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    console.log(count, 'couter')

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <GoogleSvg/>
                    <div>{count}</div>
                    <form className={classes.form} noValidate>
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => dispatch(increment())}
                        >
                            Sign In
                        </Button>

                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox value="remember" color="primary" />}*/}
                        {/*    label="Remember me"*/}
                        {/*/>*/}
                        {/*<Grid container>*/}
                        {/*    <Grid item xs>*/}
                        {/*        <Link href="#" variant="body2">*/}
                        {/*            Forgot password?*/}
                        {/*        </Link>*/}
                        {/*    </Grid>*/}
                        {/*    <Grid item>*/}
                        {/*        <Link href="#" variant="body2">*/}
                        {/*            {"Don't have an account? Sign Up"}*/}
                        {/*        </Link>*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}

                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default SignInSide
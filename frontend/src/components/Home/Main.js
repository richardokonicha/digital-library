import { Box, Button, Card, Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Image from 'next/image'
import DocPreview from "./DocPreview"

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(4),
        // backgroundColor: theme.palette.secondary.light,
        position: 'relative'

    },
    boxcover: {
        position: 'relative',
        width: "100%",
        height: theme.spacing(50),
        borderRadius: theme.spacing(20),
        [theme.breakpoints.down("xs")]: {
            height: theme.spacing(14),
        },
        [theme.breakpoints.down("md")]: {
            height: theme.spacing(30),
        },
    },
    img: {
        objectPosition: "100% 10%"
    },
    overflow: {
        overflow: "hidden"
    },


}))

const Main = ({ materials }) => {
    const classes = useStyles()
    return (
        <Container>
            <Container maxWidth="md">
                <Box display="flex" m={2} justifyContent="space-around" flexDirection='row'  >
                    <Box >
                        <Button color="inherit" className={classes.btn}>Home</Button>
                    </Box>
                    <Box >
                        <Button color="inherit" className={classes.btn}>My classes</Button>
                    </Box>
                    <Box >
                        <Button color="inherit" className={classes.btn}>Academic calender</Button>
                    </Box>
                    <Box >
                        <Button color="inherit" className={classes.btn}>Create uploads</Button>
                    </Box>
                </Box>
            </Container>
            <Box className={classes.boxcover} flexDirection="column" display="flex" alignContent="center" >
                <Image
                    alt="Mountains"
                    src="/bcover.png"
                    // layout="fill"
                    width={345}
                    height={240}
                    // sizes="50px"
                    // objectFit="contain"
                    className={classes.img}
                    quality={100}
                />
            </Box>
            <Grid container className={classes.overflow}>
                <Grid item sm={6}>
                    <DocPreview materials={materials}></DocPreview>
                </Grid>
                <Grid item sm={4}>
                    <Box >
                        jhgjhj
                        </Box>
                </Grid>

            </Grid>
        </Container>
    )
}

export default Main
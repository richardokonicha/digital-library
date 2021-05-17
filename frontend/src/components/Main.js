import { Box, Card, Container, Grid} from "@material-ui/core"
import { makeStyles} from "@material-ui/core/styles"
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
    card:{
        padding: theme.spacing(4),
        // backgroundColor: theme.palette.secondary.light,
        position: 'relative'
        
    },
    boxcover: {
        position: 'relative',
        width: "100%",
        height: theme.spacing(50),
        borderRadius: theme.spacing(20),
        // [theme.breakpoints.down("sm")]: {
            // height: theme.spacing(10),
// 
        // }
    },
    img: {
        objectPosition: "100% 10%"

    },
    book: {
        backgroundColor: "black",
        width: theme.spacing(22),
        height: theme.spacing(26),
        borderRadius: theme.spacing(1),
        

    }
}))


const Main = () => {
    const classes = useStyles()
    return(
        <Container>
                <Box className={classes.boxcover} >
                <Image
                    alt="Mountains"
                    src="/bcover.png"
                    layout="fill"
                    // width="auto"
                    // height="auto"
                    // sizes="50px"
                    objectFit="contain"
                    className={classes.img}
                    quality={100}
                />
                </Box>
                <Grid container>
                    <Grid item sm={6}>
                        <Box  className={classes.book}>
                            
                        </Box>
                    
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
import { Container, Box, Typography, GridList, GridListTile } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(2)
        //    display: 'flex',
        //    '& > *': {
        //        margin: theme.spacing(1),
        //    },
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        minWidth: '100%',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        // overflow: "hidden",

    },
    avatarContain: {
        display: 'flex',
        flexDirection: 'column',
        //   alignContent: 'center',
        //   justifyItems: 'center'

    },
    avatar: {
        border: '2px #096C3A solid'

    }
}))

const stories = [
    { id: 1, author: 'Engr Howard Njoku', image: 'jj', content: 'some annoucement' },
    { id: 2, author: 'Engr Richard Okonicha', image: 'jj', content: 'some annoucement' },
    { id: 3, author: 'Prof Ubenmene', image: 'jj', content: 'some annoucement' },
    { id: 4, author: 'Prof Ubenmene', image: 'jj', content: 'some annoucement' },
    { id: 5, author: 'Engr Howard Njoku', image: 'jj', content: 'some annoucement' },
    { id: 6, author: 'Engr Richard Okonicha', image: 'jj', content: 'some annoucement' },
    { id: 7, author: 'Prof Ubenmene', image: 'jj', content: 'some annoucement' },
    { id: 8, author: 'Prof Ubenmene', image: 'jj', content: 'some annoucement' },
]

const Stories = () => {
    const classes = useStyles();
    return (
        <Container>

            <div className={classes.root}>
                <Box fontWeight="fontWeightBold" fontSize={16}>Annoucements</Box>
                <GridList cellHeight='auto' className={classes.gridList} cols={3.5}>
                    {stories.map(story => (
                        <GridListTile key={story.id}  >
                            <Box flexDirection="column" display="flex" flexWrap="nowrap">
                                <Box alignSelf="center" >
                                    <Avatar alt={story.author} src={story.image} className={classes.avatar} />
                                </Box>
                                <Box alignSelf="center" textAlign="center" fontWeight="fontWeightRegular" p={1} fontSize={8}>{story.author}</Box>
                            </Box>
                        </GridListTile >
                    ))}
                </GridList>
            </div>
        </Container>
    )
}

export default Stories
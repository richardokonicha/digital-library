import { Container, Box, Avatar, GridList, GridListTile } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(2)
	},
	gridList: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
		minWidth: '100%',
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),

	},
	avatarContain: {
		display: 'flex',
		flexDirection: 'column',
	},
	avatar: {
		border: '2px #096C3A solid'
	}
}))

const Stories = ({ stories }) => {
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
									<Avatar alt={story.fields.author} src={story.fields["Attachments 2"][0].thumbnails.large.url} className={classes.avatar} />
								</Box>
								<Box alignSelf="center" textAlign="center" fontWeight="fontWeightRegular" p={1} fontSize={8}>{story.fields.author}</Box>
							</Box>
						</GridListTile >
					))}
				</GridList>
			</div>
		</Container>
	)
}

export default Stories


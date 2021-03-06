import { Container, Box, Button, Typography, GridList, GridListTile, GridListTileBar, Card, CardActions, CardContent, CardActionArea, CardMedia } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Image from 'material-ui-image';
import Link from "next/link"

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(2)
	},
	gridList: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		width: 700,
	},
	media: {
		// boxShadow: 'rgba(0, 0, 0, 0.2) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
		boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
		borderRadius: theme.spacing(0.5),
		'&:hover': {
			boxShadow: "rgba(9, 108, 58, 0.3) 0px 0px 0px 3px",
		},
	},
	card: {
		// maxWidth: 400,
		padding: theme.spacing(1),
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
		'&:hover': {
			color: 'rgba(9, 108, 58, 0.4)',
		},
	},
}))

const Book = ({ material }) => {
	const classes = useStyles();
	return (
		<Card className={classes.card} elevation={4}>
			<CardActionArea>
				<CardMedia
					component="img"
					className={classes.media}
					image={material.fields["Attachments"][0].thumbnails.large.url}
					title="fdfd"
				>
				</CardMedia>

			</CardActionArea>
		</Card >
	)
}


const DocPreview = ({ materials }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Box fontWeight="fontWeightBold" fontSize={16}>Popular now</Box>
			<GridList className={classes.gridList} cols={3.5} cellHeight='auto' spacing={18}>
				{materials.map(material => (
					<GridListTile key={material.id}  >
						<Book material={material} />
						<GridListTileBar
							title={material.fields.Name}
							subtitle={<span>by: Richard Okonicha</span>}
							actionIcon={
								<Link
									component='a'
									href={{
										pathname: "/reading",
										query: { uri: material.fields["Attachments"][0].url },
									}}
								>
									<IconButton aria-label={`info about Nuclear`} className={classes.icon}>
										<InfoIcon />
									</IconButton>
								</Link>

							} />
					</GridListTile >
				))}
			</GridList>
		</div>
	)
}

export default DocPreview


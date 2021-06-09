import React, { useState } from "react";
import { Container, Box, Avatar, GridList, GridListTile, Badge, Toolbar, IconButton, Typography, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { red, blue, green } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
// import { MenuIcon } from '@material-ui/core/Icon'
import Hidden from '@material-ui/core/Hidden';

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
		border: '2px #096C3A solid',
		width: theme.spacing(5),
		height: theme.spacing(5),
	},
	img: {
		width: '100%'
	},
	smallavatar: {
		width: 20,
		height: 20,
		border: `2px solid ${theme.palette.background.paper}`,
	},
	btn: {
		textTransform: "capitalize",
		fontSize: '20px',
		color: "#9D9D9D"

	}

}))


const AutoRotatingCarouselModal = ({ handleOpen, setHandleOpen, isMobile, stories }) => {
	const classes = useStyles();

	return (
		<div>
			<AutoRotatingCarousel
				label="Done"
				open={handleOpen.open}
				onClose={() => setHandleOpen({ open: false })}
				onStart={() => setHandleOpen({ open: false })}
				autoplay={true}
				mobile={isMobile}
				style={{ position: "absolute" }}
			>
				{stories.map(story => (
					<Slide
						key={story.id}
						media={
							<img className={classes.img} src={story.fields["Attachments"][0].thumbnails.large.url} />
						}
						mediaBackgroundStyle={{ backgroundColor: green[400] }}
						style={{ backgroundColor: green[600] }}
						title={story.fields.Notes}
						subtitle={
							<Box flexDirection="column" display="flex"  >
								<Box alignSelf="center" >
									<Badge
										overlap="circle"
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right',
										}}
										badgeContent={
											<Avatar alt={story.fields.author} src='https://res.cloudinary.com/konichar/image/upload/v1623026671/stories/logo1_trcxod.png' className={classes.smallavatar} />
										}
									>
										<Avatar alt={story.fields.author} src={story.fields["Attachments 2"][0].thumbnails.large.url} className={classes.avatar} />
									</Badge>
								</Box>
								<Box alignSelf="center" textAlign="center" fontWeight="fontWeightRegular" p={1} fontSize={8}>{story.fields.author}</Box>
							</Box>
						}
					/>
				))}
			</AutoRotatingCarousel>
		</div>
	);
};

const Stories = ({ stories }) => {
	const classes = useStyles();
	const [handleOpen, setHandleOpen] = useState({ open: false });
	const handleClick = () => {
		setHandleOpen({ open: true });
	};
	const matches = useMediaQuery("(max-width:600px)");
	return (
		<Container>
			<Hidden smUp>
				<div className={classes.root} >
					<Box fontWeight="fontWeightBold" fontSize={10}>Announcements, news and stories</Box>
					<GridList cellHeight='auto' className={classes.gridList} cols={3.5}>
						{stories.map(story => (
							<GridListTile key={story.id}  >
								<Box flexDirection="column" display="flex" flexWrap="nowrap" onClick={handleClick}>
									<Box alignSelf="center" >
										<Avatar alt={story.fields.author} src={story.fields["Attachments 2"][0].thumbnails.large.url} className={classes.avatar} />
									</Box>
									<Box alignSelf="center" textAlign="center" fontWeight="fontWeightRegular" p={1} fontSize={8}>{story.fields.author}</Box>
									<AutoRotatingCarouselModal
										stories={stories}
										isMobile={matches}
										handleOpen={handleOpen}
										setHandleOpen={setHandleOpen}
									/>
								</Box>
							</GridListTile >
						))}
					</GridList>
				</div>
			</Hidden>

			<div>


				{/* <Toolbar> */}



				{/* </Toolbar> */}
			</div>

		</Container>
	)
}

export default Stories



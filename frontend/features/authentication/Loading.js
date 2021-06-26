import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring'


const useStyles = makeStyles({
    div: {
        position: 'absolute',
        fontSize: '100px'
    }
})

const Loading = ({ loading, setLoading }) => {
    const [flip, set] = useState(false)
    const classes = useStyles();
    const props = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0.2 },
        reset: true,
        reverse: flip,
        delay: 700,
        // config: config.molasses,
        onRest: () => set(!flip),
    })
    return (
        <animated.div style={props} className={classes.div}>

            hello

        </animated.div>
    )
}

export default Loading


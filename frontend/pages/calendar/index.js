import React from 'react'
import { Container } from '@material-ui/core'
// import Copyright from '../src/components/Copyright'
import Header from '../../src/components/Header'
import dynamic from 'next/dynamic'
import MobileBar from "../../src/components/MobileBar"
import Iframe from 'react-iframe'

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#096C3A',
            main: '#096C3A',
            dark: '#096C3A',
        },
        secondary: {
            light: '#5b5b5b',
            main: '#333333',
            grey: '#FFFFFFA1',
        },
        text: {
            light: '#B0B3B8',
            main: '#E4E6EB',
            dark: '#000000',
        },
    },
});

export default function Home({ stories, materials }) {
    console.log(materials)
    return (
        <ThemeProvider theme={theme}>
            <Header />

            {/* <Container>

                <Copyright />
            </Container> */}

            <Container>
                <Iframe url="https://calendar.google.com/calendar/embed?src=hrva3ig8lhbffigescr5e31l68%40group.calendar.google.com&ctz=Africa%2FLagos"
                    width="100%"
                    height="300"
                    frameborder="0" scrolling="no"
                    id="myId"
                    display="initial"
                    position="relative"
                    style="border: 0" />
            </Container>

            <MobileBar />
        </ThemeProvider>
    )
}



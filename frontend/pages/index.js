import React from 'react'
import { Container } from '@material-ui/core'
// import Copyright from '../src/components/Copyright'
import Header from '../src/components/Header'
import Main from '../src/components/Home/Main'
import dynamic from 'next/dynamic'
import MobileBar from "../src/components/MobileBar"


import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Stories from '../src/components/Home/Stories'

// const Copyright = dynamic(
//     () => import('../src/components/Copyright'),
//     { ssr: false }
// )

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
            <Stories stories={stories} />

            <Main materials={materials}></Main>
            {/* <Container>

                <Copyright />
            </Container> */}
            <MobileBar />
        </ThemeProvider>
    )
}



const obj = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
    },
}

export const getStaticProps = async () => {
    const res = await fetch('https://api.airtable.com/v0/app89hVUuXaclfNRh/stories?maxRecords=10&view=Grid%20view', obj);
    const stories = await res.json();


    const resm = await fetch('https://api.airtable.com/v0/app89hVUuXaclfNRh/materials?maxRecords=10&view=Grid%20view', obj);
    const materials = await resm.json();



    return {
        props: {
            stories: stories.records,
            materials: materials.records,
        },
        revalidate: 10
    };
};
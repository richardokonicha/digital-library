import React, { useState } from 'react'
import { Container } from '@material-ui/core'/
// import Header from '../src/components/Header'
import Main from '../src/components/Home/Main'
// import dynamic from 'next/dynamic'
import MobileBar from "../src/components/MobileBar"
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { useCollection } from 'react-firebase-hooks/firestore'
// import firebase from '../firebase/clientApp'
import Layout from '../src/components/Layout'

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Stories from '../src/components/Home/Stories'


export default function Home({ stories, materials }) {
    // const [user, loading, error] = useAuthState(firebase.auth())
    // const [votes, votesLoading, votesError] = useCollection(firebase.firestore().collection('votes'), {})

    // if (!votesLoading && votes) {
    //     votes.docs.map((doc) => console.log(doc.data()))
    // }

    return (
        <>
            <Layout>
                <Stories stories={stories} />
                <Main materials={materials}></Main>

                <MobileBar />
            </Layout>



            {/* <Container>
                <Copyright />
            </Container> */}
        </>
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
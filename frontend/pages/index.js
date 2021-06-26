import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import Header from '../src/components/Header'
import Main from '../src/components/Home/Main'
import dynamic from 'next/dynamic'
import MobileBar from "../src/components/MobileBar"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from '../firebase/clientApp'


import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Stories from '../src/components/Home/Stories'


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
    const [ user, loading, error ] = useAuthState(firebase.auth())
    const [ votes, votesLoading, votesError ] = useCollection(firebase.firestore().collection('votes'), {})
    const [ image, setImage ] = useState(null)

    if (!votesLoading && votes){
        votes.docs.map((doc) => console.log(doc.data()))
    }

    const db = firebase.firestore()

    const addVoteDocument = async (vote) => {
        await db.collection('votes').doc(user.uid).set({
            vote,
        })
    }


    const handleFile = (e) => {
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleSubmit = async () => {
        const storageRef = firebase.storage().ref()
        const fileRef = storageRef.child(image.name)
        await fileRef.put(image)
        const fileUrl = await fileRef.getDownloadURL()
        console.log(fileUrl, 'submit')

    }
    

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <input type='file' onChange={handleFile}></input>
            <button onClick={handleSubmit}>
                click me to say yes
            </button>
        
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
console.log(`${process.env}`, 'process')


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
import React from 'react'
import { Container } from '@material-ui/core'
import Copyright from '../../src/components/Copyright'
import Header from '../../src/components/Header'
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
    // typography: {
    //     fontFamily: [
    //         'Helvetica'
    //     ].join(',')
    // },
    // overrides: {
    //     MuiCssBaseline: {
    //         '@global': {
    //             '@font-face': [helvetica]
    //         }
    //     }
    // },
    // status: {
    //   danger: orange[500],
    // },
  });

export default function Home(){
    return(
        <ThemeProvider theme={theme}>
        <Header/>
        <Container>
            
        this ios a test
        <Copyright/>
        </Container>
        </ThemeProvider>
    )
}
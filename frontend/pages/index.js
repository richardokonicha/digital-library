import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../src/components/Header'
import {Container} from "@material-ui/core";
import Copyright from "../src/components/Copyright";
import Main from "../src/components/Main";
import {ThemeProvider} from "@material-ui/core/styles";
import React from "react";

export default function Home() {
  return (
      <>
          <Header/>


      {/*  <footer className={styles.footer}>*/}
      {/*  <a*/}
      {/*    href="https://www.unn.edu.ng/"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    To restore the diginity of man {' '}*/}
      {/*    <img src="/assets/favicon/android-chrome-192x192.png" alt="UNN Logo" className={styles.logo} />*/}
      {/*  </a>*/}
      {/*</footer>*/}
      </>
  )
}

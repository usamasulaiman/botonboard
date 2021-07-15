import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Welcome from "../components/Welcome";
import Onboarding from "../components/Onboarding";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  const [shouldOnboard, udpateOnboardingStatus] = React.useState(false);
  const updateEmailStatus = (flag) => {
    udpateOnboardingStatus(flag);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Bot-board</title>
        <meta name="description" content="Just a bot helping you onboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Flex>
          <Welcome updateEmailStatus={updateEmailStatus} />
          {shouldOnboard && <Onboarding />}
        </Flex>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://noonacademy.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          noonacademy.com
        </a>
      </footer>
    </div>
  );
}

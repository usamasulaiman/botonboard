import React from "react";
import Image from "next/image";
import Welcome from "../components/Welcome";
import Onboarding from "../components/Onboarding";
import { get } from "lodash-es";

import { Flex, Container, Spacer, Box } from "@chakra-ui/react";
import { Client } from "@notionhq/client";

export default function Home({ notionFunctions }) {
  const [shouldOnboard, udpateOnboardingStatus] = React.useState(false);
  const updateEmailStatus = (flag) => {
    udpateOnboardingStatus(flag);
  };

  const filteredFunctionalTeams = () =>
    notionFunctions.filter(
      (item) => get(item, ["properties", "function", "rich_text"]).length
    );

  return (
    <Container
      animate
      w="100vw"
      maxW="1400px"
      style={{ minHeight: "100vh" }}
      centerContent
      className="homepage"
    >
      <Flex
        w="100%"
        h="100%"
        flex="1"
        alignItems={shouldOnboard ? '' : 'center'}
        justifyContent={!shouldOnboard ? '' : 'center'}
        className="main"
        marginTop="150px"
        marginBottom="4"
      >
        <Box maxW={shouldOnboard ? '400px' : '600px'} justifyContent="center" style={{display: "flex", alignItems: "center"}}>
          <Welcome updateEmailStatus={updateEmailStatus} />
        </Box>
        {shouldOnboard && (
          <Box flex="1">
            <Onboarding
              style={{ flex: 1 }}
              functions={filteredFunctionalTeams()}
            />
          </Box>
        )}
      </Flex>
      <footer className="footer">
        <a
          href="https://noonacademy.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          noonacademy.com
        </a>
      </footer>
    </Container>
  );
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.databases.query({
    database_id: process.env.NOTION_FUNCTION_DB,
  });

  return {
    props: {
      notionFunctions: response.results,
    },
  };
}

import React from "react";
import Image from "next/image";
import Welcome from "../components/Welcome";
import Onboarding from "../components/Onboarding";
import { get } from "lodash-es";

import { Flex, Container, Spacer, Box } from "@chakra-ui/react";
import { Client } from "@notionhq/client";

export default function Home({ notionFunctions, notionProductTeams, notionUsers }) {

  console.log('teams and users', notionProductTeams, notionUsers)

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
        marginTop="100px"
        marginBottom="4"
      >
        {/* , alignItems: "center" */}
        <Box maxW={shouldOnboard ? '450px' : '600px'} justifyContent="center" style={{display: "flex"}}>
          <Welcome updateEmailStatus={updateEmailStatus} notionProductTeams={notionProductTeams} notionUsers={notionUsers} />
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
  const notionFunctions = await notion.databases.query({
    database_id: process.env.NOTION_FUNCTION_DB,
  });
  const notionUsers = await notion.databases.query({
    database_id: process.env.NOTION_USER_DB,
  });
  const notionProductTeams = await notion.databases.query({
    database_id: process.env.NOTION_TEAM_DB,
  });

  return {
    props: {
      notionFunctions: notionFunctions.results,
      notionProductTeams: notionProductTeams.results,
      notionUsers: notionUsers.results
    },
  };
}

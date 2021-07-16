import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, WrapItem, Avatar, HStack, Flex } from '@chakra-ui/react' 
import { getInfoFromNotionDBList } from '../../utils/notionHelpers'
import { get } from 'lodash';
import HighlightedText from '../Common/highlightedText'
function WelcomeMessage(props) {
  const { verifiedUser, notionUsers, userProductTeam } = props;
  const allUserProperties = getInfoFromNotionDBList(notionUsers, ['properties'])
  console.log('userProductTeam', userProductTeam);

  const allUserNames = allUserProperties.map(item => !!get(item, ['name', 'rich_text']) && get(item, ['name', 'rich_text'])[0].plain_text)

  return (
    <Box className="welcome-message">
      <Text fontSize="lg">
        We're super excited to have you within the {" "}
        <HighlightedText>{verifiedUser.functionName} </HighlightedText>team.
        {" "} You'll be up and ready to go in no time.
        <br /><br />
        First off, some introductions are in order. Here a few of your team members from the {verifiedUser.functionName} team that you'll be a new addition to. You can click on their faces to see a bit about them.
      </Text>
      <HStack marginY="40px" flexWrap="wrap" alignItems="flex-start">
        {allUserProperties.filter((item, index) => index%2 === 0 && item).map(item => {
          const name = !!get(item, ['name', 'rich_text']) ? get(item, ['name', 'rich_text'])[0].plain_text : ''
          return (
            // <WrapItem w="160px" height="80px" border="1px" borderColor="yellow.400" borderRadius="12px" marginBottom="24px">
            <WrapItem marginBottom="24px">
              <Flex direction="column" justifyContent="flex-start" alignItems="center">
                {/* <Avatar size="lg" name={name} src={item.photo.url} style={{transform: 'translate(-10px, -10px)'}} /> */}
                <Avatar size="lg" name={name} src={item.photo.url} />
                {!!name && <Text fontSize="xs">{name.split(' ')[0]}</Text>}
              </Flex>
            </WrapItem>
          )
        })}
      </HStack>
      <Text fontSize="lg">
        Each developer from your team (or other teams) is also part of a product team at Noon. There are four major product teams right now that look after different functions and You'll be part of the {" "}
        <HighlightedText>{verifiedUser.teamName} team</HighlightedText>.
        <br /><br />
        Within the {verifiedUser.teamName} team, you'll be working alongside {" "}
        {allUserNames.filter((item, index) => index%2 !== 0 && item).map(item => <i>{`${item}, `}</i>)}. <HighlightedText>{userProductTeam.emName}</HighlightedText> is your engineering manager and <HighlightedText>{userProductTeam.pmName}</HighlightedText> is the product manager of the team.
      </Text>
    </Box>
  )
}

WelcomeMessage.propTypes = {
  verifiedUser: PropTypes.shape(),
  notionUsers: PropTypes.shape(),
  userProductTeam: PropTypes.shape(),
}

WelcomeMessage.defaultProps = {
  verifiedUser: {},
  notionUsers: {},
  userProductTeam: {},
}

export default WelcomeMessage


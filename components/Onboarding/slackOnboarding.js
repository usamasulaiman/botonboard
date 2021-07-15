import React from 'react'
import PropTypes from 'prop-types'
import {get} from 'lodash-es'
import { Flex, Text, Link, HStack } from "@chakra-ui/react";

function SlackOnboarding(props) {
  const { functions, verifiedUser } = props;
  return (
    <Flex direction="column">
      <Text fontSize="2xl" fontWeight="normal">
        Next step: Signup to Slack 👖
      </Text>
      <Text>
        Open up Slack{" "}
        <Link color="teal.500" href="#">
          using this link
        </Link>
        {" "}and find join the following channels that your team members specified for you.
        <br />
        You can read more about the channels by clicking on each of the channel name.
      </Text>
      <Text>
        Channels: {" "}
        <HStack spacing={4}>
          {/* {!!functions && functions.map(item => (
            <Tag key={item.id} variant="solid" colorScheme="teal">{get(item, ['properties', 'function', 'rich_text'])}</Tag>
          ))} */}
        </HStack>
      </Text>
    </Flex>
  )
}

SlackOnboarding.propTypes = {

}

export default SlackOnboarding


import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from '@chakra-ui/react' 

function WelcomeMessage(props) {
  const {} = props;
  return (
    <Box className="welcome-message">
      <Text>
        Welcome to your new team 
      </Text>
    </Box>
  )
}

WelcomeMessage.propTypes = {

}

export default WelcomeMessage


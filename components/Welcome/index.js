import React from 'react'
import PropTypes from 'prop-types';
import { Container, Input, FormControl, Text, Button, Spinner, InputRightElement, InputGroup, useToast } from "@chakra-ui/react"
import Authentication from './authentication'
import WelcomeMessage from './welcomeMessage'

function Welcome(props) {
  const { updateEmailStatus, notionProductTeams, notionUsers } = props;

  const [verifiedUser, updateVerifiedUser] = React.useState({})


  React.useEffect(() => {
    if (localStorage.user) {
      updateVerifiedUser(JSON.parse(localStorage.getItem('user') || '{}'))
      updateEmailStatus(true);
    }
  }, [])


  return (
    <Container>
      <Authentication
        verifiedUser={verifiedUser}
        updateEmailStatus={updateEmailStatus}
        updateVerifiedUser={updateVerifiedUser}
        notionProductTeams={notionProductTeams}
        notionUsers={notionUsers}
      />
      <WelcomeMessage />
    </Container>
  )
}

Welcome.propTypes = {
  updateEmailStatus: PropTypes.func.isRequired,
}

export default Welcome


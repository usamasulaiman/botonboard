import React from 'react'
import PropTypes from 'prop-types';
import { isEmpty, get } from 'lodash-es' 
import { Container, Input, FormControl, Text, Button, Spinner, InputRightElement, InputGroup, useToast } from "@chakra-ui/react"
import Authentication from './authentication'
import WelcomeMessage from './welcomeMessage'
// import { getInfoFromNotionDBList } from '../../utils/notionHelpers' 

function Welcome(props) {
  const { updateEmailStatus, notionProductTeams, notionUsers } = props;
  const [userProductTeam, updateUserProductTeam] = React.useState({})
  const [verifiedUser, updateVerifiedUser] = React.useState({})

  const getUserProductTeam = (user) => {
    console.log('reaches here', verifiedUser, userProductTeam);
    if (!isEmpty(userProductTeam)) return true;
    let selectedTeam;
    notionProductTeams.forEach(item => {
      if (get(item, ['properties', 'team', 'select', 'name']) === user.teamName) selectedTeam = item.properties
    })
    console.log('selectedTeam', selectedTeam, notionProductTeams);
    if (!selectedTeam) return false;
    const { channels: { multi_select: channels_array }, em: { rich_text: em_text }, team: { select: { name: teamName } }, pm: { rich_text: pm_text } } = selectedTeam;
    
    const teamObj = {
      channels: channels_array.map(item => item.name),
      teamName,
      emName: em_text[0].plain_text,
      pmName: pm_text[0].plain_text,
    }
    console.log('teamObj', teamObj);
    updateUserProductTeam(teamObj);
  }
  

  React.useEffect(() => {
    if (localStorage.user) {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      updateVerifiedUser(user)
      getUserProductTeam(user)
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
      <WelcomeMessage verifiedUser={verifiedUser} notionUsers={notionUsers} userProductTeam={userProductTeam} />
    </Container>
  )
}

Welcome.propTypes = {
  updateEmailStatus: PropTypes.func.isRequired,
}

export default Welcome


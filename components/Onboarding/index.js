import React from "react";
import PropTypes from "prop-types";
import { find } from "lodash-es";
import { Flex, Text, FormControl, Select, VStack } from "@chakra-ui/react";
import TeamSelection from './teamSelection'
import SlackOnboarding from './slackOnboarding'
function Onboarding(props) {
  const { functions } = props;
  const [verifiedUser, updateVerifiedUser] = React.useState({})

  React.useEffect(() => {
    if (localStorage.user) {
      updateVerifiedUser(JSON.parse(localStorage.getItem('user') || '{}'))
    }
  }, [])

  const updateUser = (propertyObject) => {
    const updatedValue = { ...verifiedUser, ...propertyObject };
    updateVerifiedUser(updatedValue)
    localStorage.setItem('user', JSON.stringify(updatedValue));
  } 

  return (
    <VStack spacing="64px">
      <TeamSelection functions={functions} updateUser={updateUser} verifiedUser={verifiedUser}/>
      {/* <SlackOnboarding teamProperties={find(functions, ['functions', ])} verifiedUser={verifiedUser} /> */}
    </VStack>
  );
}

Onboarding.propTypes = {
  functions: PropTypes.shape().isRequired,
};

export default Onboarding;

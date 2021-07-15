import React from "react";
import PropTypes from "prop-types";
import { Flex, Text, FormControl, Select, VStack } from "@chakra-ui/react";
import TeamSelection from './teamSelection'
function Onboarding(props) {
  const { functions } = props;

  return (
    <VStack spacing="64px">
      <TeamSelection functions={functions} />
    </VStack>
  );
}

Onboarding.propTypes = {
  functions: PropTypes.shape().isRequired,
};

export default Onboarding;

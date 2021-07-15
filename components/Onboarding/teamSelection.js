import React,  { useRef } from 'react'
import PropTypes from 'prop-types'
import { get } from "lodash-es";
import { Flex, Text, FormControl, Select } from "@chakra-ui/react";

function TeamSelection(props) {
  const { functions } = props;

  const functionNames = useRef(getFunctionNames(functions))

  function getFunctionNames(functions) {
    console.log("functions are", functions);
    if (!functions || !functions.length) return [];
    return functions.map(item => get(item, ['properties', 'function', 'rich_text'])[0].plain_text)
  }

  return (
    <Flex direction="column">
      <Text fontSize="2xl" fontWeight="normal">
        Let's choose your team first
      </Text>
      <FormControl id="email">
        <Select variant="filled" placeholder="Filled">
          {functionNames.current && functionNames.current.length ? functionNames.current.map(functionTeamName => (
              <option value="option1">{functionTeamName}</option>
          )) : (
            <Text>No function found</Text>
          )}
        </Select>
      </FormControl>
    </Flex>
  )
}

TeamSelection.propTypes = {

}

export default TeamSelection


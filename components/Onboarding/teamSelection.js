import React,  { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { get } from "lodash-es";
import { Flex, Text, FormControl, Select } from "@chakra-ui/react";

function TeamSelection(props) {
  const { functions, updateUser, verifiedUser } = props;
  console.log('verified', verifiedUser)
  const [ team, updateTeamName ] = useState('');

  const functionNames = useRef(getFunctionNames(functions))

  function getFunctionNames(functions) {
    console.log("functions are", functions);
    if (!functions || !functions.length) return [];
    return functions.map(item => get(item, ['properties', 'function', 'rich_text'])[0].plain_text)
  }

  const updateTeam = (value) => {
    updateTeamName(value)
    updateUser({ team: value });
  }

  useEffect(() => {
    if (verifiedUser && verifiedUser.team) {
      updateTeamName(verifiedUser.team)
    }
  }, [])

  return (
    <Flex direction="column">
      <Text fontSize="2xl" fontWeight="normal">
        Let's choose your team first
      </Text>
      <FormControl id="team">
        <Select name="team" variant="filled" value={team} placeholder="Filled" onChange={(e) => updateTeam(e.target.value)}>
          {functionNames.current && functionNames.current.length ? functionNames.current.map(functionTeamName => (
              <option value={functionTeamName}>{functionTeamName}</option>
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


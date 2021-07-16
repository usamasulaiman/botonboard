import React from 'react'
import PropTypes from 'prop-types';
import { getInfoFromNotionDBList } from '../../utils/notionHelpers';
import { Box, Text, Input, InputGroup, FormControl, InputRightElement, Button, Spinner, useToast } from '@chakra-ui/react';

function Authentication(props) {
  const { verifiedUser, updateEmailStatus, updateVerifiedUser, notionProductTeams, notionUsers } = props;
  const [submitting, setSubmitting] = React.useState(false)
  const [formError, updateFormError] = React.useState(false)
  const [email, updateEmail] = React.useState("")

  const usersList = React.useRef(getInfoFromNotionDBList(notionUsers, ['properties', 'email', 'email']))

  const toast = useToast();

  const EMAIL_PATTERN = /^(\s*[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}\s*)$/;

  const handleChange = (event) => {
    if (formError) updateFormError(false)
    updateEmail(event.target.value)
  }
  
  const checkEmail = (e) => {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email)) updateFormError(true)
    else {
      if (email.includes('noonacademy.com') || email.includes('non.sa')) {
        console.log('user list', usersList)
        if (usersList.current.includes(email)) {
          localStorage.setItem('user', JSON.stringify({email}))
          updateVerifiedUser({email})
          updateEmailStatus(true);
        } else {
          updateEmailStatus(false);
          toast({
            title: "That's bad. We didn't find your email in the list",
            description: "Can you confirm if you've been added by the HR to the list",
            status: "error",
            duration: 9000,
            position: 'bottom-right',
            isClosable: true,
          })
        }
      }
      else {
        updateEmailStatus(false);
        toast({
          title: "Uh oh! That's not the correct email id",
          description: "Make sure you are using your noon email id",
          status: "error",
          duration: 9000,
          position: 'bottom-right',
          isClosable: true,
        })
      }
    }
    setSubmitting(false);
  }

  return (
    <Box>
      <Text
        bgGradient="linear(to-l, #7928CA,#FF0080)"
        bgClip="text"
        fontSize={verifiedUser && verifiedUser.email ? '4xl' : '6xl'}
        fontWeight="extrabold"
      >
        Welcome {verifiedUser && verifiedUser.email ? `${verifiedUser.email.split('@')[0].replace('.', ' ')}` : 'to Hibiki'}
      </Text>
      <Text
        mb={10}
        fontSize="3xl"
        fontWeight="normal"
      >
        {verifiedUser ? 'Let\'s get you setup!' : 'The bot that will help you onboard. Enter your email to get started'}
      </Text>
      {!verifiedUser || !verifiedUser.email && (
        <form onSubmit={checkEmail}>
          <FormControl id="email">
            
            <InputGroup size="md">
              <Input
                value={email}
                isRequired
                onChange={handleChange}
                placeholder="Enter your noon email id"
                type="email"
              />
              <InputRightElement width="7.5rem">
                <Button type="submit" width="6.5rem" h="1.75rem" size="sm" colorScheme="teal">
                  {submitting ? <Spinner size="sm" color="white" /> : "Let's Start!"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {formError && <Text color="tomato">Looks like the email is not valid</Text>}
          </FormControl>
        </form>
      )}
    </Box>
  )
}

Authentication.propTypes = {

}

export default Authentication


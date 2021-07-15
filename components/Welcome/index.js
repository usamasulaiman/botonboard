import React from 'react'
import PropTypes from 'prop-types';
import { Container, Input, FormControl, Text, Button, Spinner, InputRightElement, InputGroup, useToast } from "@chakra-ui/react"

function Welcome(props) {
  const { updateEmailStatus } = props;
  const toast = useToast();

  const [email, udpateEmail] = React.useState("")
  const [verifiedEmail, udpateVerifiedEmail] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [formError, updateFormError] = React.useState(false)

  const EMAIL_PATTERN = /^(\s*[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}\s*)$/;

  const handleChange = (event) => {
    if (formError) updateFormError(false)
    udpateEmail(event.target.value)
  }

  React.useEffect(() => {
    if (localStorage.email) {
      udpateVerifiedEmail(localStorage.getItem('email'))
      updateEmailStatus(true);
    }
  }, [])

  const checkEmail = (e) => {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email)) updateFormError(true)
    else {
      if (email.includes('noonacademy.com') || email.includes('non.sa')) {
        localStorage.setItem('email', email)
        udpateVerifiedEmail(email)
        updateEmailStatus(true);
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
    <Container>
      <Text
        bgGradient="linear(to-l, #7928CA,#FF0080)"
        bgClip="text"
        fontSize={verifiedEmail ? '4xl' : '6xl'}
        fontWeight="extrabold"
      >
        Welcome {verifiedEmail ? `${verifiedEmail.split('@')[0].replace('.', ' ')}` : 'to Hibiki'}
      </Text>
      <Text
        mb={10}
        fontSize="3xl"
        fontWeight="normal"
      >
        {verifiedEmail ? 'Let\'s get you setup!' : 'The bot that will help you onboard. Enter your email to get started'}
      </Text>
      {!verifiedEmail && (
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
    </Container>
  )
}

Welcome.propTypes = {
  updateEmailStatus: PropTypes.func.isRequired,
}

export default Welcome


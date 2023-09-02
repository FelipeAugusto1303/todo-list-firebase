import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { Google, LocalFireDepartment } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

function LoginPage() {
  const { googleSignIn, user } = UserAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (user !== null && !location.status?.mode) {
      navigate('/todo-list-firebase/list')
    }
  }, [user])

  return (
    <Flex alignItems='center' justifyContent='flex-start' flexDirection='column'>
      <Heading as='h2' size='3xl'>
        FireTask <LocalFireDepartment fontSize='20px' />
      </Heading>
      <Flex
        alignItems='center'
        justifyContent='flex-start'
        flexDirection='column'
        w='100%'
        mt='200px'
      >
        <Text>Faça o login com sua conta Google para continuar.</Text>
        <Button colorScheme='blue' mt='10px' onClick={handleGoogleSignIn} gap='10px'>
          <Google fontSize='10px' /> Login com Google
        </Button>
      </Flex>
    </Flex>
  )
}

export default LoginPage

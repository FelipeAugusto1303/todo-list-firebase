import {
  Box,
  Button,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { LocalFireDepartment } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { createUser, getUser } from '../../services/firebaseService'
import { onSnapshot } from 'firebase/firestore'
import { ArrowBackIcon } from '@chakra-ui/icons'

function Header({ goback = false }) {
  const { logOut, user } = UserAuth()
  const [listUser, setListUser] = useState(null)
  const [userMenu, setUserMenu] = useState(false)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await logOut()
      navigate('/todo-list-firebase', {
        state: {
          mode: 'logout',
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user !== null) {
      const queryUser = getUser(user.email)

      onSnapshot(queryUser, (querySnapshot) => {
        setListUser(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      })
    }
  }, [user])

  useEffect(() => {
    if (listUser !== null && listUser.length === 0) {
      createUser({ email: user.email, name: user.displayName, photoURL: user.photoURL })
    }
  }, [listUser])

  return (
    user && (
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        w='100%'
      >
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          justifyContent='center'
          gap='5px'
        >
          {goback && <ArrowBackIcon onClick={() => navigate(-1)} />}
          <Heading as='h6' size='sm'>
            FireTask <LocalFireDepartment fontSize='20px' color='red' />
          </Heading>
        </Box>
        <Box position='relative'>
          <Image
            src={
              user
                ? user.photoURL
                : 'https://i.pinimg.com/280x280_RS/59/af/9c/59af9cd100daf9aa154cc753dd58316d.jpg'
            }
            boxSize='30px'
            borderRadius='40px'
            onClick={() => setUserMenu((prev) => !prev)}
          />
          <Modal isOpen={userMenu}>
            <ModalOverlay>
              <ModalContent borderRadius='50px'>
                <ModalBody borderRadius='50px'>
                  <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    bg='#fff'
                    right='0'
                    zIndex='1'
                    gap='20px'
                    p='20px'
                  >
                    <Image src={user.photoURL} boxSize='100px' borderRadius='100px' mt='20px' />
                    <Heading as='h6' size='md'>
                      Olá, {user.displayName}
                    </Heading>
                    <Button
                      colorScheme='red'
                      variant='outline'
                      width='250px'
                      borderRadius='20px'
                      onClick={handleSignOut}
                    >
                      Sair
                    </Button>
                  </Box>
                </ModalBody>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </Box>
      </Box>
    )
  )
}

export default Header

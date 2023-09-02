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

function Header() {
  const { logOut, user } = UserAuth()
  const [listUser, setListUser] = useState(null)
  const [userMenu, setUserMenu] = useState(false)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await logOut()
      navigate('/todo-list-firebase')
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
    <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      w='100%'
    >
      <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
        <Heading as='h6' size='sm'>
          FireTask <LocalFireDepartment fontSize='20px' color='red' />
        </Heading>
      </Box>
      <Box position='relative'>
        <Image
          src={user.photoURL}
          boxSize='30px'
          borderRadius='40px'
          onClick={() => setUserMenu((prev) => !prev)}
        />
        <Modal isOpen={userMenu}>
          <ModalOverlay>
            <ModalContent>
              <ModalBody>
                <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  bg='#fff'
                  right='0'
                  zIndex='1'
                  gap='20px'
                >
                  <Image src={user.photoURL} boxSize='100px' borderRadius='100px' mt='20px' />
                  <Heading as='h6' size='md'>
                    olá, {user.displayName}
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
}

export default Header

import {
  Box,
  Button,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'
import { UserAuth } from '../../context/AuthContext'

function UserModal({ isOpen, onClose, userData, handleRemoveWorker, listCreator }) {
  const { user } = UserAuth()
  const isOwner = userData.email === listCreator

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent borderRadius='40px' p='40px'>
          <ModalCloseButton p='25px' />
          <ModalBody borderRadius='40px'>
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
              <Image src={userData.photoURL} boxSize='100px' borderRadius='100px' mt='20px' />
              <Heading as='h6' size='md'>
                {userData.name}
              </Heading>
              <Heading as='h6' size='md'>
                {userData.email}
              </Heading>
              {!isOwner && (
                <Button
                  colorScheme='red'
                  variant='outline'
                  width='250px'
                  borderRadius='20px'
                  onClick={() => handleRemoveWorker(userData.email)}
                >
                  Remover usuário
                </Button>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default UserModal

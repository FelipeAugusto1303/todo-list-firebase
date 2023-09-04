import { AddIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Input,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { addUsersToList, getUser, updateList } from '../../services/firebaseService'
import { onSnapshot } from 'firebase/firestore'
import UserModal from '../UserModal'

function OwnerList({ worker, setWorker, listId, listUsers, setUpdateList, listCreator }) {
  const [usersData, setUsersData] = useState([])
  const [avatarUsers, setAvatarUsers] = useState([])
  const [modalData, setModalData] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const removeDuplicates = (arr) => {
    const temp = []
    arr.forEach((element) => {
      if (temp.filter((t) => t.email === element.email).length === 0) {
        temp.push(element)
      }
    })
    setAvatarUsers([...temp])
  }

  useEffect(() => {
    listUsers.forEach((user) => {
      const queryUser = getUser(user)
      onSnapshot(queryUser, (querySnapshot) => {
        if (usersData.filter((data) => data.email === user).length === 0) {
          if (querySnapshot.docs.length === 0) {
            setUsersData((prev) => [
              ...prev,
              {
                email: user,
                name: 'Usuário desconhecido',
                photoURL:
                  'https://i.pinimg.com/280x280_RS/59/af/9c/59af9cd100daf9aa154cc753dd58316d.jpg',
              },
            ])
          } else {
            setUsersData((prev) => [
              ...prev,
              querySnapshot.docs.map((doc) => ({
                email: doc.data().email,
                name: doc.data().name,
                photoURL: doc.data().photoURL,
              }))[0],
            ])
          }
        }
      })
    })
  }, [listUsers])

  useEffect(() => {
    removeDuplicates(usersData)
  }, [usersData])

  const handleAddUser = () => {
    addUsersToList(listId, {
      users: [...listUsers, worker.toLowerCase()],
    })
      .then(() => {
        toast({
          title: 'Colaborador adicionado',
          description: 'Colaborador foi adicionado a lista com sucesso.',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-center',
        })
      })
      .catch((err) => {
        toast({
          title: 'Error na requisição',
          description: 'Houve um erro de requisição com o firebase',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-center',
        })
      })
    setWorker('')
    setUpdateList((prev) => !prev)
  }

  const removeWorker = (workerEmail) => {
    const index = listUsers.indexOf(workerEmail)
    const tempArray = listUsers

    tempArray.splice(index, 1)
    updateList(listId, {
      users: [...tempArray],
    })
      .then(() => {
        toast({
          title: 'Colaborador removido',
          description: 'Colaborador foi removido da lista com sucesso.',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-center',
        })
      })
      .catch((err) => {
        toast({
          title: 'Error na requisição',
          description: 'Houve um erro de requisição com o firebase',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-center',
        })
      })
    setUsersData([])
    setUpdateList((prev) => !prev)
    onClose()
  }

  const handleOpenModal = (data) => {
    setModalData(data)
    onOpen()
  }

  return (
    <>
      <Box
        data-testid='owner-list'
        w='100%'
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='center'
        gap='10px'
        mt='80px'
      >
        <Input
          data-testid='owner-input'
          size='md'
          placeholder='adicione outros colaboradores a lista'
          value={worker}
          onChange={(e) => setWorker(e.target.value)}
        />
        <Button
          colorScheme='teal'
          leftIcon={<AddIcon />}
          disabled={worker === ''}
          onClick={() => handleAddUser()}
        >
          Adicionar
        </Button>
      </Box>
      <Box w='100%' display='flex' flexDirection='row' alignItems='center' gap='10px' mt='10px'>
        <Text>Colaboradores: </Text>
        {avatarUsers.length > 0 &&
          avatarUsers.map((avatar, index) => (
            <Tooltip
              key={index}
              label={avatar.name === 'Usuário desconhecido' ? avatar.email : avatar.name}
            >
              <Avatar size='sm' src={avatar.photoURL} onClick={() => handleOpenModal(avatar)} />
            </Tooltip>
          ))}
      </Box>
      <UserModal
        isOpen={isOpen}
        onClose={onClose}
        userData={modalData}
        handleRemoveWorker={removeWorker}
        listCreator={listCreator}
      />
    </>
  )
}

export default OwnerList

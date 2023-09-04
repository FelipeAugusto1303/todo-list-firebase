import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteList, getUser, updateList } from '../../services/firebaseService'
import { onSnapshot } from 'firebase/firestore'
import EditListModal from '../EditListModal'

function CardList({ listData, listId, user }) {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const isOwner = user.email === listData.createdBy

  useEffect(() => {
    const q = getUser(listData.createdBy)
    onSnapshot(q, (querySnapshot) => {
      setUserData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }, [])

  const handleDelete = () => {
    deleteList(listId)
      .then(() => {
        toast({
          title: 'Lista deletada com sucesso',
          description: 'A lista foi deletada com sucesso',
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
  }

  const handleUpdate = (name) => {
    updateList(listId, {
      name: name,
    })
      .then(() => {
        onClose()
        toast({
          title: 'Lista atualizada com sucesso',
          description: 'A lista foi atualizada com sucesso e já esta pronta pra uso.',
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
  }

  return (
    <>
      <Card data-testid='chakra-card' w='400px' h='250px' border='1px solid #000'>
        <CardHeader>
          <Flex flexDirection='row' alignItems='center' justifyContent='space-between'>
            <Heading size='md'>{listData.name}</Heading>
            <Button
              colorScheme='blue'
              variant='outline'
              onClick={() =>
                navigate('/todo-list-firebase/task', {
                  state: {
                    listId: listId,
                    listUsers: listData.users,
                    listCreator: listData.createdBy,
                  },
                })
              }
            >
              Acessar Lista
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
            Criado em: {format(new Date(listData.createdAt.seconds * 1000), 'dd/MM/yyyy HH:mm:ss')}
          </Text>
        </CardBody>
        <Divider orientation='horizontal' />
        {userData && (
          <CardFooter data-testid='card-footer'>
            <Flex
              flexDirection='row'
              alignItems='center'
              justifyContent={isOwner ? 'space-between' : 'flex-start'}
              w='100%'
            >
              <Flex flexDirection='row' alignItems='center' justifyContent='center' gap='10px'>
                Criado por:{' '}
                <Image src={userData[0].data.photoURL} boxSize='30px' borderRadius='30px' />
              </Flex>
              {isOwner && (
                <Flex flexDirection='row' alignItems='center' gap='10px'>
                  <Button colorScheme='red' variant='outline' onClick={() => handleDelete()}>
                    Excluir
                  </Button>
                  <Button colorScheme='blue' variant='outline' onClick={onOpen}>
                    Editar
                  </Button>
                </Flex>
              )}
            </Flex>
          </CardFooter>
        )}
      </Card>
      <EditListModal
        title={listData.name}
        isOpen={isOpen}
        onClose={onClose}
        handleEdit={handleUpdate}
      />
    </>
  )
}

export default CardList

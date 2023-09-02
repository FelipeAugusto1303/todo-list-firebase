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
} from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { deleteList, getUser } from '../../services/firebaseService'
import { QuerySnapshot, onSnapshot } from 'firebase/firestore'

// import { Container } from './styles';

function CardList({ listData, listId }) {
  const navigate = useNavigate()
  const { user } = UserAuth()
  const [userData, setUserData] = useState(null)

  console.log(listData)
  console.log(user)
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
  }
  return (
    <Card w='400px' h='250px' border='1px solid #000'>
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
        <CardFooter>
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
                <Button colorScheme='blue' variant='outline'>
                  Editar
                </Button>
              </Flex>
            )}
          </Flex>
        </CardFooter>
      )}
    </Card>
  )
}

export default CardList

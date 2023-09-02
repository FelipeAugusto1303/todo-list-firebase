import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { getUser } from '../../services/firebaseService'
import { QuerySnapshot, onSnapshot } from 'firebase/firestore'

// import { Container } from './styles';

function CardList({ listData, listId }) {
  const navigate = useNavigate()
  const { user } = UserAuth()
  const [userData, setUserData] = useState(null)

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
  return (
    <Card
      w='400px'
      h='200px'
      border='1px solid #000'
      onClick={() =>
        navigate('/todo-list-firebase/task', {
          state: {
            listId: listId,
            listUsers: listData.users,
          },
        })
      }
    >
      <CardHeader>
        <Heading size='md'>{listData.name}</Heading>
      </CardHeader>
      <CardBody>
        <Text>
          Criado em: {format(new Date(listData.createdAt.seconds * 1000), 'dd/MM/yyyy HH:mm:ss')}
        </Text>
      </CardBody>
      <Divider orientation='horizontal' />
      {userData && (
        <CardFooter>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent='center'
            gap='10px'
          >
            Criado por: <Image src={userData[0].data.photoURL} boxSize='30px' borderRadius='30px' />
          </Box>
        </CardFooter>
      )}
    </Card>
  )
}

export default CardList

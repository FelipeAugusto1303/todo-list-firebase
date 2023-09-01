import { Card, CardBody, CardFooter, CardHeader, Divider, Heading, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import React from 'react'
import { useNavigate } from 'react-router-dom'

// import { Container } from './styles';

function CardList({ listData, listId }) {
  const navigate = useNavigate()
  return (
    <Card
      w='400px'
      h='200px'
      border='1px solid #000'
      onClick={() =>
        navigate('task', {
          state: {
            listId: listId,
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
      <CardFooter>Criado por: {listData.createdBy}</CardFooter>
    </Card>
  )
}

export default CardList

import React, { useState, useEffect } from 'react'
import { Flex, Box, Heading, Stack, Input, Button, IconButton } from '@chakra-ui/react'
import { createList, findAllLists } from '../../services/firebaseService'
import { Timestamp, onSnapshot } from 'firebase/firestore'
import { AddIcon } from '@chakra-ui/icons'

function ListPage() {
  const [list, setList] = useState(null)

  console.log('listas encontradas: ', list)

  useEffect(() => {
    const q = findAllLists('felipe')
    onSnapshot(q, (querySnapshot) => {
      setList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }, [])

  const handleCreateList = () => {
    console.log('estou aqui')
    const body = {
      name: 'List teste',
      createdBy: 'felipe',
      users: ['felipe'],
      createdAt: Timestamp.now(),
    }
    createList(body)
  }

  return (
    <Flex align='center' justify='flex-start' direction='column'>
      <Heading as='h2' size='2xl'>
        Minhas listas de tarefas
      </Heading>
      {list === null || list.length === 0 ? (
        <Box
          h='500px'
          display='flex'
          flexDirection='column'
          align='center'
          justifyContent='center'
          marginTop='80px'
          marginBottom='50px'
          gap='5px'
        >
          <Heading as='h3' size='lg'>
            Parece que você não está em nenhuma lista
          </Heading>
          <Heading as='h6' size='sm'>
            Clique no botão abaixo e crie sua lista
          </Heading>
          <IconButton colorScheme='teal' icon={<AddIcon />} onClick={() => handleCreateList()} />
        </Box>
      ) : (
        <Box
          w='100%'
          display='flex'
          direction='row'
          align='center'
          justifyContent='flex-start'
          marginTop='80px'
          marginBottom='50px'
        >
          <Input size='lg' />
          <Button colorScheme='teal'>Criar Lista</Button>
        </Box>
      )}
    </Flex>
  )
}

export default ListPage
import React, { useState, useEffect } from 'react'
import { Flex, Box, Heading } from '@chakra-ui/react'
import { findAllLists } from '../../services/firebaseService'
import { onSnapshot } from 'firebase/firestore'

function ListPage() {
  const [list, setList] = useState(null)

  console.log('listas encontradas: ', list)

  useEffect(() => {
    const q = findAllLists('user1')
    onSnapshot(q, (querySnapshot) => {
      setList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }, [])

  return (
    <Flex align='center' justify='flex-start' direction='column'>
      <Heading as='h2' size='2xl'>
        Minhas listas de tarefas
      </Heading>
    </Flex>
  )
}

export default ListPage

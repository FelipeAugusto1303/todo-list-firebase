import { AddIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Input, Text, Tooltip } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { addUsersToList, getUser } from '../../services/firebaseService'
import { onSnapshot } from 'firebase/firestore'

function OwnerList({ worker, setWorker, listId, listUsers, setUpdateList }) {
  const [usersData, setUsersData] = useState([])
  const [avatarUsers, setAvatarUsers] = useState([])

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
      users: [...listUsers, worker],
    })
    setWorker('')
    setUpdateList((prev) => !prev)
  }
  return (
    <>
      <Box
        w='100%'
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='center'
        gap='10px'
        mt='80px'
      >
        <Input
          size='md'
          placeholder='adicione outros colaboradores a lista'
          value={worker}
          onChange={(e) => setWorker(e.target.value)}
        />
        <Button colorScheme='teal' leftIcon={<AddIcon />} onClick={() => handleAddUser()}>
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
              <Avatar size='sm' src={avatar.photoURL} onClick={() => console.log(avatar)} />
            </Tooltip>
          ))}
      </Box>
    </>
  )
}

export default OwnerList

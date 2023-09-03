import { useToast } from '@chakra-ui/react'
import React from 'react'

const toast = useToast()

export const toastMessage = (title, description, status) => {
  return toast({
    title: title,
    description: description,
    status: status,
    duration: 9000,
    isClosable: true,
    position: 'top-center',
  })
}

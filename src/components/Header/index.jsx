import { Box, Heading } from '@chakra-ui/react'
import { LocalFireDepartment } from '@mui/icons-material'
import React from 'react'

function Header() {
  return (
    <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      w='100%'
    >
      <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
        <Heading as='h6' size='sm'>
          FireTask <LocalFireDepartment fontSize='20px' color='red' />
        </Heading>
      </Box>
      <Box></Box>
    </Box>
  )
}

export default Header

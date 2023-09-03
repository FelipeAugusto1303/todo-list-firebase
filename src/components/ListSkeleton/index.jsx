import { Flex, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'
import React from 'react'

function ListSkeleton() {
  return (
    <Stack w='100%' mt='80px'>
      <Skeleton height='40px' />
      <Skeleton height='40px' />

      <Flex
        w='100%'
        flexDirection='row'
        alignItems='center'
        justifyContent='center'
        gap='10px'
        mt='70px'
      >
        <Skeleton height='250px' w='30%' />
        <Skeleton height='250px' w='30%' />
        <Skeleton height='250px' w='30%' />
      </Flex>
    </Stack>
  )
}

export default ListSkeleton

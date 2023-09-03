import { Flex, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'
import React from 'react'

// import { Container } from './styles';

function TaskSkeleton() {
  return (
    <Stack w='100%' mt='80px'>
      <Flex w='100%' flexDirection='row' alignItems='center' gap='10px'>
        <Skeleton height='40px' w='90%' />
        <Skeleton height='40px' w='10%' />
      </Flex>
      <Flex w='100%' flexDirection='row' alignItems='center' gap='10px'>
        <Skeleton height='20px' w='10%' />
        <SkeletonCircle size='10' />
        <SkeletonCircle size='10' />
        <SkeletonCircle size='10' />
        <SkeletonCircle size='10' />
      </Flex>
      <Skeleton height='40px' mt='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' mt='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
    </Stack>
  )
}

export default TaskSkeleton

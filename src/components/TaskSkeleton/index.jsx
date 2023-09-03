import { Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'
import React from 'react'

// import { Container } from './styles';

function TaskSkeleton() {
  return (
    <Stack w='100%' mt='40px'>
      <Skeleton height='20px' />
      <Skeleton height='20px' />
      <SkeletonCircle size='10' />
      <SkeletonText mt='4' noOfLines={5} spacing='4' skeletonHeight='2' />
    </Stack>
  )
}

export default TaskSkeleton

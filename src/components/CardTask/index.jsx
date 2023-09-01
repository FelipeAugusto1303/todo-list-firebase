import { Box, Card, CardBody, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

function CardTask({ taskData }) {
  return (
    <Card w='100%' display='flex' alignItems='center' border='1px solid #000'>
      <CardBody>
        <Text>{taskData.title}</Text>
      </CardBody>
    </Card>
  )
}

export default CardTask

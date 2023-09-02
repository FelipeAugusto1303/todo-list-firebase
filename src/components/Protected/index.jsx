import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

const Protected = ({ children }) => {
  const { user } = UserAuth()
  const navigate = useNavigate()
  if (!user) {
    navigate('/todo-list-firebase/')
  }

  return children
}

export default Protected

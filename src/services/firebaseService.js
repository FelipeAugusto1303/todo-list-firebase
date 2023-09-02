import { collection, addDoc, query, where, orderBy } from 'firebase/firestore'
import { db } from './firebaseAPI'

const COLLECTION_LIST_NAME = 'todolist'
const COLLECTION_TASK_NAME = 'task'
const COLLECTION_USERS_NAME = 'users'

export const findAllLists = (user) => {
  return query(collection(db, COLLECTION_LIST_NAME), where('users', 'array-contains', user))
}

export const findAllTasks = (id) => {
  return query(collection(db, COLLECTION_LIST_NAME, id, COLLECTION_TASK_NAME))
}

export const createList = async (body) => {
  return await addDoc(collection(db, COLLECTION_LIST_NAME), body)
}

export const createTask = async (listId, body) => {
  return await addDoc(collection(db, COLLECTION_LIST_NAME, listId, COLLECTION_TASK_NAME), body)
}

export const getUser = async (email) => {
  return query(collection(db, COLLECTION_USERS_NAME), where('email', '==', email))
}

export const createUser = async (body) => {
  return await addDoc(collection(db, COLLECTION_USERS_NAME), body)
}

import { collection, addDoc, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebaseAPI'

const COLLECTION_LIST_NAME = 'todolist'
const COLLECTION_TASK_NAME = 'task'
const COLLECTION_USERS_NAME = 'users'

export const findAllLists = (user) => {
  return query(collection(db, COLLECTION_LIST_NAME), where('users', 'array-contains', user))
}
export const findAllListsUsers = (id) => {
  return query(doc(db, COLLECTION_LIST_NAME, id))
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

export const getUser = (email) => {
  return query(collection(db, COLLECTION_USERS_NAME), where('email', '==', email))
}

export const createUser = async (body) => {
  return await addDoc(collection(db, COLLECTION_USERS_NAME), body)
}

export const addUsersToList = async (listId, body) => {
  return await updateDoc(doc(db, COLLECTION_LIST_NAME, listId), body)
}

export const updateTask = async (listId, taskId, body) => {
  return await updateDoc(doc(db, COLLECTION_LIST_NAME, listId, COLLECTION_TASK_NAME, taskId), body)
}

export const deleteList = async (listId) => {
  return await deleteDoc(doc(db, COLLECTION_LIST_NAME, listId))
}

export const deleteTask = async (listId, taskId) => {
  return await deleteDoc(doc(db, COLLECTION_LIST_NAME, listId, COLLECTION_TASK_NAME, taskId))
}

import { getDocs, collection, addDoc, query } from 'firebase/firestore'
import { db } from './firebaseAPI'

const COLLECTION_LIST_NAME = 'todolist'
const COLLECTION_TASK_NAME = 'task'

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

import {
  doc,
  collection,
  deleteDoc,
  setDoc,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore'

import { db } from '@services/firebase'

import { ListProps } from '@/typings/List'

export const getList = async (listID: ListProps['id']) => {}

export const listCollection = collection(db, 'lists')

export const getLists = async () => {
  try {
    const listsSnapshot = await getDocs(listCollection)
    const lists: ListProps[] = []

    listsSnapshot.forEach((list) => {
      lists.push(list.data() as ListProps)
    })

    return lists
  } catch (error) {
    console.error('getLists', error)
    return []
  }
}

export const subscribeToLists = (observer: (snapshot: QuerySnapshot<DocumentData>) => void) => {
  const unsubscribe = onSnapshot(listCollection, observer)
  return unsubscribe
}

export const updateList = (list: ListProps) => {
  try {
    const listRef = doc(db, 'lists', list.id)
    setDoc(listRef, list, { merge: true })
  } catch (error) {
    console.error('updateList', error)
  }
}

export const createList = async (list: ListProps) => {
  try {
    await setDoc(doc(db, 'lists', list.id), list)
  } catch (error) {
    console.error('createList', error)
  }
}

export const deleteList = async (listID: ListProps['id']) => {
  try {
    await deleteDoc(doc(db, 'lists', listID))
  } catch (error) {
    console.error('deleteList', error)
  }
}

import {
  doc,
  collection,
  deleteDoc,
  setDoc,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  query,
  where,
  getDocs,
  writeBatch,
} from 'firebase/firestore'

import { db } from '@services/firebase'

import { ListProps } from '@/typings/List'
import { UserProps } from '@/typings/User'

import { GENERAL_LIST } from '@/consts'

interface SubscribeToUserListsProps {
  observer: (snapshot: QuerySnapshot<DocumentData>) => void
  userId: UserProps['uid']
}

const listDocumentName = import.meta.env.VITE_LIST_DOCUMENT_NAME as string

export const listCollection = collection(db, listDocumentName)

export const subscribeToUserLists = ({ observer, userId }: SubscribeToUserListsProps) => {
  const userListQuery = query(listCollection, where('userId', '==', userId))

  const unsubscribe = onSnapshot(userListQuery, observer)
  return unsubscribe
}

export const checkIfUserHasLists = async (userId: UserProps['uid']) => {
  try {
    const userListQuery = query(listCollection, where('userId', '==', userId))
    const userList = await getDocs(userListQuery)

    return !userList.empty
  } catch (error) {
    console.error('checkIfUserHasLists', error)
  }
}

export const updateList = async (list: ListProps) => {
  try {
    const listRef = doc(db, listDocumentName, list.id)
    await setDoc(listRef, list, { merge: true })
  } catch (error) {
    console.error('updateList', error)
  }
}
// TODO: test this func
export const updateUserLists = async (lists: ListProps[]) => {
  try {
    const batch = writeBatch(db)

    lists.forEach((list) => {
      const listRef = doc(db, listDocumentName, list.id)
      batch.set(listRef, list)
    })

    await batch.commit()
  } catch (error) {
    console.error('updateLists', error)
  }
}

export const createList = async (list: ListProps) => {
  try {
    await setDoc(doc(db, listDocumentName, list.id), list)
  } catch (error) {
    console.error('createList', error)
  }
}

export const createDefaultListForNewUser = async (userId: UserProps['uid']) => {
  try {
    const list: ListProps = {
      ...GENERAL_LIST,
      userId,
      createdAt: new Date().toISOString(),
    }

    await createList(list)
  } catch (error) {
    console.error('createDefaultListForNewUser', error)
  }
}

export const deleteList = async (listID: ListProps['id']) => {
  try {
    await deleteDoc(doc(db, listDocumentName, listID))
  } catch (error) {
    console.error('deleteList', error)
  }
}

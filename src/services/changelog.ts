import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@services/firebase'

import { ChangeLogListProps } from '@/typings/List'

import packageJson from '../../package.json'

const currentVersion = packageJson.version
const changelogDocumentName = 'changelog'

export const listCollection = collection(db, changelogDocumentName)

export const getChangeLog = async () => {
  try {
    const changeLogListsQuery = query(listCollection, where('version', '==', currentVersion))
    const changeLogDocs = await getDocs(changeLogListsQuery)

    const changeLogList = changeLogDocs.docs[0].data()
    return changeLogList as ChangeLogListProps
  } catch (error) {
    console.error('getChangelog', error)
  }

  return {} as ChangeLogListProps
}

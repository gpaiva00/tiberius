import { User } from '@services/firebase'

export interface UserProps extends User {
  firstName: string
}

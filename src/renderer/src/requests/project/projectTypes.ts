import { User } from '../../config/auth'

export interface ProjectType {
  id: number
  title: string
  description: string
  delivered: boolean
  owner: number
  participant: User[]
}

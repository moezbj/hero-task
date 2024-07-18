import { User } from '../../config/auth'

enum TASKS_TYPE {
  'NOT_READY' = 'NOT_READY',
  'TO_DO' = 'TO_DO',
  'IN_PROGRESS' = 'IN_PROGRESS',
  'COMPLETED' = 'COMPLETED',
  'TO_TEST' = 'TO_TEST',
  'TO_DEPLOY' = 'TO_DEPLOY'
}
export interface ProjectType {
  id: number
  title: string
  description: string
  delivered: boolean
  owner: number
  participants: User[]
}
export interface TaskType {
  type: TASKS_TYPE
  createdAt: string
  updatedAt: string
  title: string
  description: string
  note: string
  createdById: number
  projectId: number
}

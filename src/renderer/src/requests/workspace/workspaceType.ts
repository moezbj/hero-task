import { ProjectType } from '../project/projectTypes'

export interface WorkSpaceType {
  id: number
  name: string
  description: string
  collaborator: number[]
  projects: ProjectType[]
  adminId: number
}

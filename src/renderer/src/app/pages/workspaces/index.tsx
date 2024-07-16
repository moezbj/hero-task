import { Route, Routes } from 'react-router-dom'

import { Protected } from '../../components/layout/Protected'
import { ROLE } from '../../../lib/role'
import Workspaces from '../workspaces/workspaces'
import Workspace from '../workspaces/workspace'
import Projects from '../project/index'

function RoutesPage(): JSX.Element {
  return (
    <Protected roles={[ROLE.ADMIN]}>
      <Routes>
        <Route index path="/" element={<Workspaces />} />
        <Route path="/workspace/:id" element={<Workspace />} />
        <Route path="/workspace/:id/project/:id/*" element={<Projects />} />
      </Routes>
    </Protected>
  )
}
export default RoutesPage

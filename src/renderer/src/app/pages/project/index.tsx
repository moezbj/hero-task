import ProjectWrapper from '../../components/layout/projectWrapper'
import { Route, Routes } from 'react-router-dom'

import { Protected } from '../../components/layout/Protected'
import { ROLE } from '../../../lib/role'
import Backlog from './backlog'
import Board from './board'
import Inbox from './inbox'

function RoutesPage(): JSX.Element {
  return (
    <Protected roles={[ROLE.ADMIN]}>
      <ProjectWrapper>
        <Routes>
          <Route index path="/backlog" element={<Backlog />} />
          <Route path="/board" element={<Board />} />
          <Route path="/inbox" element={<Inbox />} />
        </Routes>
      </ProjectWrapper>
    </Protected>
  )
}
export default RoutesPage

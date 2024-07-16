import ProjectWrapper from '../../components/layout/projectWrapper'
import { Route, Routes } from 'react-router-dom'

import { Protected } from '../../components/layout/Protected'
import { ROLE } from '../../../lib/role'
import Backlog from './backlog'
import Board from './board'

function RoutesPage(): JSX.Element {
  return (
    <Protected roles={[ROLE.ADMIN]}>
      <ProjectWrapper>
        <Routes>
          <Route path="/" element={<Backlog />} />
          <Route path="/Board" element={<Board />} />
        </Routes>
      </ProjectWrapper>
    </Protected>
  )
}
export default RoutesPage

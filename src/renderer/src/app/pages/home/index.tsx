import Wrapper from '../../components/layout/wrapper'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../dashboard'
import Worksapcce from '../workspaces'

import { Protected } from '../../components/layout/Protected'
import { ROLE } from '../../../lib/role'

function RoutesPage(): JSX.Element {
  return (
    <Protected roles={[ROLE.ADMIN]}>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Worksapcce />} />
          <Route path="/projects" element={<Dashboard />} />
        </Routes>
      </Wrapper>
    </Protected>
  )
}
export default RoutesPage

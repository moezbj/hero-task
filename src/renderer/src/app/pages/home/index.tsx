import Wrapper from '../../components/layout/wrapper'
import { Route, Routes } from 'react-router-dom'

import { Protected } from '../../components/layout/Protected'
import { ROLE } from '../../../lib/role'
import Workspace from '../workspaces'

function RoutesPage(): JSX.Element {
  return (
    <Protected roles={[ROLE.ADMIN]}>
      <Wrapper>
        <Routes>
          <Route path="*" element={<Workspace />} />
          <Route path="/profile" />
          <Route path="/settings" />
        </Routes>
      </Wrapper>
    </Protected>
  )
}
export default RoutesPage

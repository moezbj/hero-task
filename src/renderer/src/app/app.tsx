import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'
// import SnackBarProvider from '@hooks/useSnackBar';

import Pages from './pages'

export function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      {/* <SnackBarProvider> */}
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
      {/*  </SnackBarProvider> */}
    </ApolloProvider>
  )
}

export default App

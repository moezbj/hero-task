import { ApolloLink, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([errorLink, httpLink]);

const makeClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });

export const { getClient } =  registerApolloClient(()=> makeClient());

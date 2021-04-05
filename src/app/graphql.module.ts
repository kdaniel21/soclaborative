import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';
import { environment } from 'src/environments/environment';

// TODO: Extract to environment

// eslint-disable-next-line max-len
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0aWNpcGFudE5hbWUiOiJmb28gYmFyIiwicGFydGljaXBhbnRJZCI6ImNrbjRkNzJiNTAwMzh4MmgzY3U3M3Z1bjMiLCJyb29tSWQiOiJja240ZDNjajMwMDIweDJoMzQ3ajRnMDBtIiwiaWF0IjoxNjE3NjEzMzA0fQ.tXSrfdJz_oHEui7ywOzdwjB_sd0IP2y3CXeQmcwXq_Y';

const jwtToken = new Promise<string>((resolve) => chrome.storage.sync.get((data) => resolve(data.jwtToken)));

export const createApollo = (httpLink: HttpLink): ApolloClientOptions<any> => {
  const http = httpLink.create({ uri: environment.graphqlHttpUri });

  const ws = new WebSocketLink({
    uri: environment.graphqlWsUri,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    options: { reconnect: true, connectionParams: async () => ({ Authorization: `Bearer ${await jwtToken}` }) },
  });

  const authMiddleware = setContext(async (request, { headers }) => ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: { ...headers, Authorization: `Bearer ${await jwtToken}` },
  }));

  let link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ws,
    http
  );

  link = authMiddleware.concat(link);
  return { link, cache: new InMemoryCache() };
};

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}

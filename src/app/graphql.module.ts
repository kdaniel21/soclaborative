import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const jwtToken = new Observable<string>((observer) =>
  chrome.storage.sync.get((data) => {
    observer.next(data.jwtToken);
    observer.complete();
  })
);

const wsClient = new SubscriptionClient(environment.graphqlWsUri, {
  reconnect: true,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  connectionParams: async () => ({ Authorization: `Bearer ${await jwtToken.toPromise()}` }),
});

export const restartWebsockets = () => {
  wsClient.close(true);
};

export const createApollo = (httpLink: HttpLink): ApolloClientOptions<any> => {
  const http = httpLink.create({ uri: environment.graphqlHttpUri });

  const ws = new WebSocketLink(wsClient);

  const authMiddleware = setContext(async (request, { headers }) => {
    const token = await jwtToken.toPromise();

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return { headers: { ...headers, Authorization: `Bearer ${token}` } };
  });

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

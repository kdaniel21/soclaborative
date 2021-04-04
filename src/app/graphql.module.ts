import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const uri = 'http://localhost:3000';

const jwtToken = new Promise<string>((resolve) =>
  chrome.storage.sync.get((data) => {
    console.log('getting token', data.jwtToken);
    resolve(data.jwtToken || null);
  })
);

export const createApollo = (httpLink: HttpLink): ApolloClientOptions<any> => {
  const http = httpLink.create({ uri });

  const authMiddleware = setContext(async (_, { headers }) => ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: { ...headers, Authorization: `Bearer ${await jwtToken}` },
  }));

  const link = authMiddleware.concat(http);
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

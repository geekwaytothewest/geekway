import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import {NgModule} from '@angular/core';



import { HttpClientModule } from '@angular/common/http';

const uri = 'https://cms.geekway.com/graphql';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache()
  };
}

@NgModule({
  imports: [HttpClientModule],
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}

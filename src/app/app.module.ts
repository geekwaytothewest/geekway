import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { RedirectionMessageComponent } from './shared/redirection-message/redirection-message.component';
import { GraphQLModule } from './graphql.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotfoundComponent } from './notfound/notfound.component';
import { ClarityModule } from '@clr/angular';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatRippleModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { GalleryModule } from 'ng-gallery';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RedirectionMessageComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    GraphQLModule,
    FontAwesomeModule,
    ClarityModule,
    MatRippleModule,
    ApolloModule,
    HttpClientModule,
    GalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRouteSnapshot } from '@angular/router';
import { RedirectionMessageComponent } from './shared/redirection-message/redirection-message.component';
import { NotfoundComponent } from './notfound/notfound.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule),
    pathMatch: 'full'
  },
  {
    path: 'externalRedirect',
    resolve: {
        url: externalUrlProvider
    },
    component: RedirectionMessageComponent
  },
  {
    path: 'conventions',
    loadChildren: () => import('./conventions/conventions.module').then(m => m.ConventionsModule)
  },
  {
    path: 'boardmembers',
    loadChildren: () => import('./boardmembers/boardmembers.module').then(m => m.BoardmembersModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'policies',
    loadChildren: () => import('./policies/policies.module').then(m => m.PoliciesModule)
  },
  {
    path: 'geekway',
    loadChildren: () => import('./conventions/geekwaytothewest/geekwaytothewest.module').then(m => m.GeekwaytothewestModule)
  },
  {
    path: 'mini',
    loadChildren: () => import('./conventions/geekwaymini/geekwaymini.module').then(m => m.GeekwayminiModule)
  },
  {
    path: 'micro',
    loadChildren: () => import('./conventions/geekwaymicro/geekwaymicro.module').then(m => m.GeekwaymicroModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./library/library.module').then(m => m.LibraryModule)
  },
  {
    path: 'venues',
    loadChildren: () => import('./venues/venues.module').then(m => m.VenuesModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule)
  },
  {
    path: 'page/:slug',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'} 
];

@NgModule({
  providers: [
    {
        provide: externalUrlProvider,
        useValue: (route: ActivatedRouteSnapshot) => {
            const externalUrl = route.paramMap.get('externalUrl');
            window.open(externalUrl, '_self');
        },
    },
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

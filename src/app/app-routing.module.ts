import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, PreloadAllModules } from '@angular/router';
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
    path: 'events',
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./library/library.module').then(m => m.LibraryModule)
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
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

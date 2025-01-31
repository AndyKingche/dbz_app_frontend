import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { authGuard } from './core/guards/auth.guard';
import { clientGuard } from './core/guards/client.guard';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    canActivate: [clientGuard],
    children: [
      {
        path: '',
        redirectTo: '/starter',
        pathMatch: 'full',
      },
      {
        path: 'starter',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },{
    path: '',
    component: FullComponent,
    children:[
      {
          path:'dashboard',
          title: 'Dashboard',
          loadChildren: ()=>
          import('src/app/components/components.module').then((m=>m.ComponentsModule))
      }
    ]
    
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

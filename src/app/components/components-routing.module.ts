import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { UserFormComponent } from './user-module/user-form/user-form.component';
import { BlankComponent } from '../layouts/blank/blank.component';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path:'admin',
    component:BlankComponent,
    data:{
      title: 'Bienvenido | Admin'
    },
    canActivate: [authGuard],
    children:[
      {
        path:'user',
        component: UserFormComponent,
        data:{
           title:'Admin | Usuarios',
           urls:[
            {title: 'Dashboard', url: '/dashboard/admin'},
            { title:'Admin | Usuarios'}
           ]
        }
       
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }

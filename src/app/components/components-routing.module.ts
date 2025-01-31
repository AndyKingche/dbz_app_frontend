import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { UserFormComponent } from './user-module/user-form/user-form.component';
import { BlankComponent } from '../layouts/blank/blank.component';
import { authGuard } from '../core/guards/auth.guard';
import { CharacterFormComponent } from './character-module/character-form/character-form.component';

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
            {title: 'Dashboard', url: '/dashboard/admin/user'},
            { title:'Admin | Usuarios'}
           ]
        }
       
      },
      {
        path:'character',
        component: CharacterFormComponent,
        data:{
           title:'Admin | Personajes',
           urls:[
            {title: 'Dashboard', url: '/dashboard/admin/character'},
            { title:'Admin | Personajes'}
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

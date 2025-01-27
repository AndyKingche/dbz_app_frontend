import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { UserModuleModule } from './user-module/user-module.module';
import { CharacterFormComponent } from './character-module/character-form/character-form.component';
import { CharacterModuleModule } from './character-module/character-module.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    UserModuleModule,
    CharacterModuleModule
  ]
})
export class ComponentsModule { }

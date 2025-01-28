import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { UserDialogComponent } from './user-form/user-dialog/user-dialog.component';
import { UserAddComponent } from './user-form/user-add/user-add.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    UserFormComponent,
    UserDialogComponent,
    UserAddComponent,
  ],
  exports: [TablerIconsModule],
  imports: [
    MaterialModule,
    CommonModule,
    TablerIconsModule.pick(TablerIcons),
    FormsModule,
    NgxSpinnerModule
  ]
})
export class UserModuleModule { }

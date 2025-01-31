import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CharacterFormComponent } from './character-form/character-form.component';
import { CharacterDialogComponent } from './character-form/character-dialog/character-dialog.component';
import { CharacterAddComponent } from './character-form/character-add/character-add.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    CharacterFormComponent,
    CharacterDialogComponent,
    CharacterAddComponent
  ],
  exports: [TablerIconsModule],
  imports: [
    MaterialModule,
    CommonModule,
    TablerIconsModule.pick(TablerIcons),
    FormsModule,
    NgxSpinnerModule,
    MatSnackBarModule
  ]
})
export class CharacterModuleModule { }

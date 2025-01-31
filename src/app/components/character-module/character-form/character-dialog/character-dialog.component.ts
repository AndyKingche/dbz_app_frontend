import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChCharacter } from 'src/app/models/character-module/ch-character';
import { ChCharacterService } from '../../services/character.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-character-dialog',
  templateUrl: './character-dialog.component.html',
  styles: [
  ]
})
export class CharacterDialogComponent implements OnInit {
  action: string;
  
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  update: boolean = false;
  imageUrl: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CharacterDialogComponent>,
   
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ChCharacter,
    private characterService : ChCharacterService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit(): void {

    if(this.action == 'Update'){
      this.update = true;
    }
    
  }

  async doAction() {
    this.spinner.show();
    this.dialogRef.close({ event: this.action, data: this.local_data });

    if(this.action == 'Add'){
      console.log(this.local_data);
      
      await firstValueFrom(this.characterService.createCharacter(this.local_data)).then(res => {
        this.spinner.hide();
      }).catch(err => {console.log(err);
        this.snackBar.open('El Personaje ya existe o revise nuevamente los datos ingresados', 'Ok', {
          duration: 10000, 
          verticalPosition: 'top',
          horizontalPosition: 'right', 
          panelClass: ['custom-snackbar']
        });
        this.spinner.hide();
      })
    }

    if(this.action == 'Update'){
      const characterId = this.local_data.id;
      const updateCharacter = this.local_data;
      delete updateCharacter.id;
      await firstValueFrom(this.characterService.updateCharacter(characterId, updateCharacter)).then(res => {
        this.spinner.hide();
      }).catch(err => {console.log(err);
        this.spinner.hide();
      })
    }

    if(this.action == 'Delete'){
      await firstValueFrom(this.characterService.deleteCharacter(this.local_data.id)).then(res => {
        this.spinner.hide();
      }).catch(err=> { console.log(err);
        this.spinner.hide();
      })
    }

    this.dialogRef.afterClosed().subscribe(res =>{
      console.log("Hola");
      
    })
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  selectFile(event: any): void {
    const file = event.target.files[0];

    if (!file) return;

    const mimeType = file.type;
    if (!mimeType.startsWith('image/')) {
      alert('Solo se permiten imágenes');
      return;
    }

    this.characterService.uploadImage(file).subscribe({
      next: (url) => {
        this.imageUrl = url;
        this.local_data.characterImage = this.imageUrl;
        console.log('Imagen subida con éxito:', url);
      },
      error: (err) => {
        console.error(err);
        alert('Error al subir la imagen');
      },
    });
  }

}

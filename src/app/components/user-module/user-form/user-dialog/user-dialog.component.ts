import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsGender } from 'src/app/models/user-module/us-gender';
import { UsRole } from 'src/app/models/user-module/us-role';
import { UsUser } from 'src/app/models/user-module/us-user';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';
import { NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styles: [
  ]
})
export class UserDialogComponent implements OnInit {
  action: string;
  
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  genders: UsGender[] = [
    { id: 1, genderCode: 'M', genderDescription: 'Masculino' }
  ];

  roles: UsRole[]=[
    {id:1, rolName: 'admin',rolDescription: 'Admin',rolStatus: true},
    {id:2, rolName: 'client',rolDescription: 'Client',rolStatus: true}
  ];
  update: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
   
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsUser,
    private userService : UserService,
    private spinner: NgxSpinnerService
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
      await firstValueFrom(this.userService.createUser(this.local_data)).then(res => {
        this.spinner.hide();
      }).catch(err => {console.log(err);
        this.spinner.hide();
      })
    }

    if(this.action == 'Update'){
      const userId = this.local_data.userId;
      const updateUser = this.local_data;
      delete updateUser.userId;
      await firstValueFrom(this.userService.updateUser(userId, this.local_data)).then(res => {
        this.spinner.hide();
      }).catch(err => {console.log(err);
        this.spinner.hide();
      })
    }

    if(this.action == 'Delete'){
      await firstValueFrom(this.userService.deleteUser(this.local_data.userId)).then(res => {
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
    if (!event.target.files[0] || event.target.files[0].length === 0) {
     
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
     
      return;
    }
   
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    
    reader.onload = (_event) => {
     
      this.local_data.imagePath = reader.result;
    };
  }
}

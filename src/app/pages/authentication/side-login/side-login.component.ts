import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, NgIf, FormsModule, ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router, 
    private auth_service: AuthService, private spinner: NgxSpinnerService) {}

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  async submit() {

    this.spinner.show();

    try {
      console.log(this.form.value);
      
      const TOKEN : any = await firstValueFrom(this.auth_service.loginUser(this.form.value))
      
      if(TOKEN != null){
        this.auth_service.setToken(TOKEN.token);
        await this.auth_service.checkRolUser(this.form.value.username!, this.spinner);
    }else{
      this.spinner.hide();
    }
    } catch (error) {
      this.spinner.hide();
    }
  }
}

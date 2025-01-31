import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatChipsModule } from '@angular/material/chips';
import { ChCharacterService } from 'src/app/components/character-module/services/character.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from 'src/app/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  standalone: true,
  imports: [
    MaterialModule,
    MatChipsModule,
    CommonModule,
    MatCardModule,
    MatGridListModule
  ],
  styleUrls: ['./starter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent implements OnInit {
  characters: any[] = [];
  user: string = "";

  constructor(private characterService: ChCharacterService, private authService:AuthService) {}

  async ngOnInit() {
    await this.getCharacters();
    this.getUser();
  }

  async getCharacters() {
    this.characters = await firstValueFrom(this.characterService.getAllCharacters());
    console.log(this.characters);
    
  }
  async getUser(){
    this.user = this.authService.getUsername() || '';
  }
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleMenu() {
    this.sidenav.toggle();
  }

  closeMenu() {
    this.sidenav.close();
  }
  logOut() {
    this.authService.logOutUser();
  }
}

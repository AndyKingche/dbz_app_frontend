import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ChCharacterService } from '../services/character.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChCharacter } from 'src/app/models/character-module/ch-character';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CharacterAddComponent } from './character-add/character-add.component';
import { CharacterDialogComponent } from './character-dialog/character-dialog.component';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
  Object.create(null);

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);

  displayedColumns = ['name','age', 'desc','image','powerlevel','action'];
  dataSource : any = [];

  constructor(private characterService: ChCharacterService, private breakpointObserver: BreakpointObserver, public dialog: MatDialog){
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['name','age', 'desc','image','powerlevel','action']
        : ['name','age', 'desc','image','powerlevel','action'];
    });
  }

  async ngOnInit() {
    const PRODUCT_DATA: ChCharacter[] = await firstValueFrom(this.characterService.getAllCharacters());
    this.dataSource = new MatTableDataSource<ChCharacter>(PRODUCT_DATA);   
  }

  async refreshTable() {
    const PRODUCT_DATA: ChCharacter[] = await firstValueFrom(this.characterService.getAllCharacters());
    this.dataSource = PRODUCT_DATA;  
  }

   ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(CharacterDialogComponent
      , {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: ChCharacter): void {
    this.refreshTable();

    this.dataSource.data.unshift({
      Name: row_obj.characterName,
      Age: row_obj.characterAge,
      Description: row_obj.characterDesc,
      Image: row_obj.characterImage,
      PowerLevel: row_obj.characterPowerLevel
    });
    this.dataSource.data = [...this.dataSource.data];
    this.dialog.open(CharacterAddComponent);
    this.table.renderRows();
  }


  updateRowData(row_obj: ChCharacter): boolean | any {
    this.refreshTable();    
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.id === row_obj.id) {
        value.Name = row_obj.characterName;
        value.Age = row_obj.characterAge;
        value.Description = row_obj.characterDesc;
        value.Image = row_obj.characterImage;
        value.PowerLevel = row_obj.characterPowerLevel;
      }
      return true;
    });
  }

   deleteRowData(row_obj: ChCharacter): boolean | any {
    this.refreshTable();
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.id !== row_obj.id;
    });
  }

}

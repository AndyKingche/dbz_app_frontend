import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { UsUser } from 'src/app/models/user-module/us-user';
import { MatPaginator } from '@angular/material/paginator';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserAddComponent } from './user-add/user-add.component';
import { UsGender } from 'src/app/models/user-module/us-gender';
import { UsRole } from 'src/app/models/user-module/us-role';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
  Object.create(null);

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);

  displayedColumns = ['name','email', 'address','gender','role','action', 'status'];
  dataSource : any = [];
  genders: UsGender[] = [
    { id: 1, genderCode: 'M', genderDescription: 'Masculino' }
  ];

  roles: UsRole[]=[
    {id:1, rolName: 'admin',
      rolDescription: 'Admin',
      rolStatus: true},
      {id:2, rolName: 'client',
        rolDescription: 'Client',
        rolStatus: true}
    ];
  constructor(private userService: UserService, breakpointObserver: BreakpointObserver, public dialog: MatDialog){
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['name', 'email', 'address','gender','role','action', 'status']
        : ['name', 'email', 'address','gender','role','action', 'status'];
    });
  }

  async ngOnInit() {
    const PRODUCT_DATA: UsUser[] = await firstValueFrom(this.userService.getAllUsers());
    this.dataSource = new MatTableDataSource<UsUser>(PRODUCT_DATA);   
  }

  async refreshTable() {
    const PRODUCT_DATA: UsUser[] = await firstValueFrom(this.userService.getAllUsers());
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
    const dialogRef = this.dialog.open(UserDialogComponent
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

  addRowData(row_obj: UsUser): void {
    this.refreshTable();

    this.dataSource.data.unshift({
      Name: row_obj.userName,
      LastName: row_obj.userLastname,
      Email: row_obj.userEmail,
      Address: row_obj.userAddress,
      Status: row_obj.userStatus,
      Gender: row_obj.gender,
      Role: row_obj.role
    });
    this.dataSource.data = [...this.dataSource.data];
    this.dialog.open(UserAddComponent);
    this.table.renderRows();
  }


  updateRowData(row_obj: UsUser): boolean | any {
    this.refreshTable();    
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.id === row_obj.userId) {
        value.Name = row_obj.userName;
        value.LastName = row_obj.userLastname;
        value.Email = row_obj.userEmail;
        value.Address = row_obj.userAddress;
        value.Status = row_obj.userStatus;
        value.Gender = row_obj.gender;
        value.Role = row_obj.role;
      }
      return true;
    });
  }

   deleteRowData(row_obj: UsUser): boolean | any {
    this.refreshTable();
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.id !== row_obj.userId;
    });
  }
}

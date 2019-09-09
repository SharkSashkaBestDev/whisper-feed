import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {UserModel} from '../models/user.model';
import {SelectionModel} from '@angular/cdk/collections';
import {WhisperCommonService} from '../services/whisper-common.service';

@Component({
  selector: 'whisper-db-users',
  templateUrl: './whisper-db-users.component.html',
  styleUrls: ['./whisper-db-users.component.scss']
})
export class WhisperDbUsersComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['select', 'position', 'id', 'name', 'screen_name'];
  dataSource: MatTableDataSource<UserModel>;
  selection = new SelectionModel<UserModel>(true, []);

  constructor(private commonService: WhisperCommonService) { }

  ngOnInit() {
    this.commonService.getUsers()
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data.map((rawUser: UserModel, index) => {
          rawUser.position = index + 1;
          return rawUser;
        }));

        this.dataSource.sort = this.sort;
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource  && this.dataSource.filteredData ? this.dataSource.filteredData.length : 0;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: UserModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getTotalSelected() {
    return this.selection.selected.length;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeSelected() {
    this.commonService.deleteUsers(this.selection.selected)
      .subscribe(result => {
        this.commonService.getUsers()
          .subscribe((data: any) => {
            this.dataSource.data = data.map((rawUser: UserModel, index) => {
              rawUser.position = index + 1;
              return rawUser;
            });
            this.dataSource.filteredData = this.dataSource.data;
            this.selection.clear();
          });
      });
  }

}

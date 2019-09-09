import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {TweetModel} from '../models/tweet.model';
import {SelectionModel} from '@angular/cdk/collections';
import {WhisperCommonService} from '../services/whisper-common.service';
import {CompanyModel} from '../models/company.model';

@Component({
  selector: 'whisper-db-companies',
  templateUrl: './whisper-db-companies.component.html',
  styleUrls: ['./whisper-db-companies.component.scss']
})
export class WhisperDbCompaniesComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['select', 'position', 'ticker', 'name', 'exchange'];
  dataSource: MatTableDataSource<CompanyModel>;
  selection = new SelectionModel<CompanyModel>(true, []);

  constructor(private commonService: WhisperCommonService) { }

  ngOnInit() {
    this.commonService.getCompanies()
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data.map((rawCompany: CompanyModel, index) => {
          rawCompany.position = index + 1;
          return rawCompany;
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

  checkboxLabel(row?: CompanyModel): string {
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
    this.commonService.deleteCompanies(this.selection.selected)
      .subscribe(result => {
        this.commonService.getCompanies()
          .subscribe((data: any) => {
            this.dataSource.data = data.map((rawCompany: CompanyModel, index) => {
              rawCompany.position = index + 1;
              return rawCompany;
            });
            this.dataSource.filteredData = this.dataSource.data;
            this.selection.clear();
          });
      });
  }

}

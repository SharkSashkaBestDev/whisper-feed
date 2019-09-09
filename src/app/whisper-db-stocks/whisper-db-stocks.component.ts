import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {StockModel} from '../models/stock.model';
import {SelectionModel} from '@angular/cdk/collections';
import {WhisperCommonService} from '../services/whisper-common.service';
import {CompanyModel} from '../models/company.model';

@Component({
  selector: 'whisper-db-stocks',
  templateUrl: './whisper-db-stocks.component.html',
  styleUrls: ['./whisper-db-stocks.component.scss']
})
export class WhisperDbStocksComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['select', 'position', 'ticker', 'open', 'close', 'date'];
  dataSource: MatTableDataSource<StockModel>;
  selection = new SelectionModel<StockModel>(true, []);

  constructor(private commonService: WhisperCommonService) { }

  ngOnInit() {
    this.commonService.getStocks()
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data.map((rawStock: StockModel, index) => {
          rawStock.position = index + 1;
          return rawStock;
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

  checkboxLabel(row?: StockModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getTotalSelected() {
    return this.selection.selected.length;
  }

  applyFilter(filterValue: string) {
    const f = ('' + filterValue).trim().toLowerCase();
    this.dataSource.filter = f;
    const sort = this.sort.direction === 'desc' ? '-' + this.sort.active : '' + this.sort.active;
    const params = [];
    params.push({ 'sort': sort });
    params.push({ 'ticker': f });
    params.push({ 'date': f });
    params.push({ 'high': f });
    params.push({ 'low': f });
    params.push({ 'open': f });
    params.push({ 'close': f });
    params.push({ 'volume': f });
    this.commonService.getStocks(params).subscribe((stocks: StockModel[]) => {
      this.dataSource.filteredData = stocks;
      this.dataSource.data = stocks;
      this.dataSource.filter = f;
    });
  }

  removeSelected() {
    this.commonService.deleteStocks(this.selection.selected)
      .subscribe(result => {
        this.commonService.getStocks()
          .subscribe((data: any) => {
            this.dataSource.data = data.map((rawStock: StockModel, index) => {
              rawStock.position = index + 1;
              return rawStock;
            });
            this.dataSource.filteredData = this.dataSource.data;
            this.selection.clear();
          });
      });
  }

  public onSort(event) {
    const sort = event.direction === 'desc' ? '-' + event.active : event.active;
    this.commonService.getStocks([{ 'sort' : sort }])
      .subscribe((stocks: StockModel[]) => {
        this.dataSource.data = stocks;
        this.dataSource.filteredData = stocks;
      });
  }

}

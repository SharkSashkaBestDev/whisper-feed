import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {WhisperCommonService} from '../services/whisper-common.service';
import {AnalysedTweetModel} from '../models/analysedtweet.model';

@Component({
  selector: 'whisper-db-analysed-tweets',
  templateUrl: './whisper-db-analysed-tweets.component.html',
  styleUrls: ['./whisper-db-analysed-tweets.component.scss']
})
export class WhisperDbAnalysedTweetsComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['select', 'position', 'id', 'text', 'user', 'created'];
  dataSource: MatTableDataSource<AnalysedTweetModel>;
  selection = new SelectionModel<AnalysedTweetModel>(true, []);

  constructor(private commonService: WhisperCommonService) { }

  ngOnInit() {
    this.commonService.getAnalysedTweets()
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data.map((rawTweet: AnalysedTweetModel, index) => {
          rawTweet.position = index + 1;
          return rawTweet;
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

  checkboxLabel(row?: AnalysedTweetModel): string {
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
    this.commonService.deleteAnalysedTweets(this.selection.selected)
      .subscribe(result => {
        this.commonService.getAnalysedTweets()
          .subscribe((data: any) => {
            this.dataSource.data = data.map((rawTweet: AnalysedTweetModel, index) => {
              rawTweet.position = index + 1;
              return rawTweet;
            });
            this.dataSource.filteredData = this.dataSource.data;
            this.selection.clear();
          });
      });
  }

}

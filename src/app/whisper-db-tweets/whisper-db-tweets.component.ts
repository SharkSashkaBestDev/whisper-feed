import {Component, OnInit, ViewChild} from '@angular/core';
import {WhisperCommonService} from '../services/whisper-common.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort, MatTableDataSource} from '@angular/material';
import {TweetModel} from '../models/tweet.model';

@Component({
  selector: 'whisper-whisper-db-tweets',
  templateUrl: './whisper-db-tweets.component.html',
  styleUrls: ['./whisper-db-tweets.component.scss']
})
export class WhisperDbTweetsComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['select', 'position', 'id', 'text', 'user', 'created'];
  dataSource: MatTableDataSource<TweetModel>;
  selection = new SelectionModel<TweetModel>(true, []);

  constructor(private commonService: WhisperCommonService) { }

  ngOnInit() {
    this.commonService.getTweets()
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data.map((rawTweet: TweetModel, index) => {
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

  checkboxLabel(row?: TweetModel): string {
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
    this.commonService.deleteTweets(this.selection.selected)
      .subscribe(result => {
        this.commonService.getTweets()
          .subscribe((data: any) => {
            this.dataSource.data = data.map((rawTweet: TweetModel, index) => {
              rawTweet.position = index + 1;
              return rawTweet;
            });
            this.dataSource.filteredData = this.dataSource.data;
            this.selection.clear();
          });
      });
  }

}

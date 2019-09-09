import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {WhisperUserLookupDialog} from '../dialogs/user-lookup.dialog';
import {WhisperCommonService} from '../services/whisper-common.service';
import {TweetModel} from '../models/tweet.model';

@Component({
  selector: 'whisper-ingestion',
  templateUrl: './whisper-ingestion.component.html',
  styleUrls: ['./whisper-ingestion.component.scss']
})
export class WhisperIngestionComponent implements OnInit {

  userId: string;
  selectedTweetsCount = 50;
  recentTweetsRetrieved: TweetModel[] = [];
  snackTime = 2000;

  availableTweetsCounts = [
    {value: 10, viewValue: '10'},
    {value: 25, viewValue: '25'},
    {value: 50, viewValue: '50'},
    {value: 100, viewValue: '100'},
    {value: 150, viewValue: '150'},
    {value: 200, viewValue: '200'}
  ];

  constructor(public dialog: MatDialog,
              private commonService: WhisperCommonService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openUserLookupDialog() {
    const dialogRef = this.dialog.open(WhisperUserLookupDialog, {
      width: '300px',
      data: {screenName: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The user lookup dialog was closed');
      this.userId = result;
    });
  }

  getUserTweets() {
    var maxId;

    if (localStorage.getItem('lastTweet')) {
      maxId = JSON.parse(localStorage.getItem('lastTweet')).tweetId;
    }

    this.commonService.ingestTweets(this.userId, this.selectedTweetsCount, maxId)
      .subscribe((data: any) => {
        this.recentTweetsRetrieved =  data.data;
        this.openSnackBar('Fetched ' + this.recentTweetsRetrieved.length + ' tweets');
        this.commonService.saveTweets(this.recentTweetsRetrieved)
          .subscribe(result => {
            setTimeout(() => this.openSnackBar('Tweets saved'), this.snackTime);
          });

        localStorage.setItem('lastTweet',
          JSON.stringify({ tweetId: this.recentTweetsRetrieved[this.recentTweetsRetrieved.length - 1].id, userId: this.userId }));
      });
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}

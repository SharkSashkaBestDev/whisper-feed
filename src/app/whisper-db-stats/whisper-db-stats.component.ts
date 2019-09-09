import { Component, OnInit } from '@angular/core';
import {WhisperCommonService} from '../services/whisper-common.service';

@Component({
  selector: 'whisper-db-stats',
  templateUrl: './whisper-db-stats.component.html',
  styleUrls: ['./whisper-db-stats.component.scss']
})
export class WhisperDbStatsComponent implements OnInit {

  usersCount: number;
  tweetsCount: number;
  analysedTweetsCount: number;
  companiesCount: number;
  stocksCount: number;

  constructor(private commonService: WhisperCommonService) { }

  ngOnInit() {
    this.commonService.getUsersCount().subscribe((data: any) => this.usersCount = data.count);
    this.commonService.getTweetsCount().subscribe((data: any) => this.tweetsCount = data.count);
    this.commonService.getAnalysedTweetsCount().subscribe((data: any) => this.analysedTweetsCount = data.count);
    this.commonService.getCompaniesCount().subscribe((data: any) => this.companiesCount = data.count);
    this.commonService.getStocksCount().subscribe((data: any) => this.stocksCount = data.count);
  }

}

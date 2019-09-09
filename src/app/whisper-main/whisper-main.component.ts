import { Component, OnInit } from '@angular/core';
import {WhisperCommonService} from '../services/whisper-common.service';
import {API_URL, API_URL_KEY} from '../constants/common';

@Component({
  selector: 'whisper-main',
  templateUrl: './whisper-main.component.html',
  styleUrls: ['./whisper-main.component.scss']
})
export class WhisperMainComponent implements OnInit {

  dbAvailable = false;

  constructor(private commonService: WhisperCommonService) {
    if (!localStorage.getItem(API_URL_KEY)) {
      localStorage.setItem(API_URL_KEY, API_URL);
    }
  }

  ngOnInit() {
    this.commonService.getStatus()
      .subscribe(() => this.dbAvailable = true);
  }

}

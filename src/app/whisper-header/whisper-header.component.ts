import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'whisper-header',
  templateUrl: './whisper-header.component.html',
  styleUrls: ['./whisper-header.component.scss']
})
export class WhisperHeaderComponent implements OnInit {

  notificationsEnabled: boolean;
  constructor(private router: Router,
              private _location: Location) { }

  ngOnInit() {
    this.notificationsEnabled = '' + localStorage.getItem('notificationsEnabled') ?
      !!localStorage.getItem('notificationsEnabled') : true;
  }

  isBackRouteLinkAvailable() {
    return this.router.url !== '/' && this.router.url !== '/main';
  }

  refreshPage() {
    window.location.reload();
  }

  notificationsAvailabilityChanged() {
    localStorage.setItem('notificationsEnabled', '' + this.notificationsEnabled);
  }

  goBack() {
    this._location.back();
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'whisper-footer',
  templateUrl: './whisper-footer.component.html',
  styleUrls: ['./whisper-footer.component.scss']
})
export class WhisperFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  refreshPage() {
    window.location.reload();
  }

}

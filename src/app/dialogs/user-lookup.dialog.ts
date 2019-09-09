import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {UserLookupDialogData} from './user-lookup.dialog-data';
import {WhisperCommonService} from '../services/whisper-common.service';
import {UserModel} from '../models/user.model';

@Component({
  selector: 'whisper-user-lookup-dialog',
  templateUrl: 'whisper-user-lookup-dialog.html',
  styleUrls: ['./whisper-user-lookup-dialog.scss']
})
export class WhisperUserLookupDialog {

  users: UserModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<WhisperUserLookupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: UserLookupDialogData,
    private commonService: WhisperCommonService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  lookupUser() {
    if (!this.data.screenName) {
      console.error('No user screen name entered!');
      return;
    }

    this.commonService.lookupTweeterUser(this.data.screenName)
      .subscribe((data: any) => {
        this.users = data.data;
      });
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.lookupUser();
    }
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WhisperMainComponent } from './whisper-main/whisper-main.component';
import {MaterialModule} from './material.module';
import { WhisperHeaderComponent } from './whisper-header/whisper-header.component';
import { WhisperFooterComponent } from './whisper-footer/whisper-footer.component';
import { WhisperDbStatsComponent } from './whisper-db-stats/whisper-db-stats.component';
import { WhisperAnalysisComponent } from './whisper-analysis/whisper-analysis.component';
import { WhisperIngestionComponent } from './whisper-ingestion/whisper-ingestion.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WhisperCommonService} from './services/whisper-common.service';
import {HttpClientModule} from '@angular/common/http';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import {WhisperUserLookupDialog} from './dialogs/user-lookup.dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WhisperDbTweetsComponent } from './whisper-db-tweets/whisper-db-tweets.component';
import { WhisperDbUsersComponent } from './whisper-db-users/whisper-db-users.component';
import { WhisperDbAnalysedTweetsComponent } from './whisper-db-analysed-tweets/whisper-db-analysed-tweets.component';
import { WhisperDbCompaniesComponent } from './whisper-db-companies/whisper-db-companies.component';
import { WhisperDbStocksComponent } from './whisper-db-stocks/whisper-db-stocks.component';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    WhisperMainComponent,
    WhisperHeaderComponent,
    WhisperFooterComponent,
    WhisperDbStatsComponent,
    WhisperAnalysisComponent,
    WhisperIngestionComponent,
    WhisperUserLookupDialog,
    WhisperDbTweetsComponent,
    WhisperDbUsersComponent,
    WhisperDbAnalysedTweetsComponent,
    WhisperDbCompaniesComponent,
    WhisperDbStocksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    WhisperCommonService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    WhisperUserLookupDialog
  ]
})
export class AppModule { }

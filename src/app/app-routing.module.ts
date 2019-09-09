import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WhisperMainComponent} from './whisper-main/whisper-main.component';
import {WhisperDbStatsComponent} from './whisper-db-stats/whisper-db-stats.component';
import {WhisperAnalysisComponent} from './whisper-analysis/whisper-analysis.component';
import {WhisperIngestionComponent} from './whisper-ingestion/whisper-ingestion.component';
import {WhisperDbTweetsComponent} from './whisper-db-tweets/whisper-db-tweets.component';
import {WhisperDbUsersComponent} from './whisper-db-users/whisper-db-users.component';
import {WhisperDbAnalysedTweetsComponent} from './whisper-db-analysed-tweets/whisper-db-analysed-tweets.component';
import {WhisperDbCompaniesComponent} from './whisper-db-companies/whisper-db-companies.component';
import {WhisperDbStocksComponent} from './whisper-db-stocks/whisper-db-stocks.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: WhisperMainComponent },
  { path: 'db', component: WhisperDbStatsComponent },
  { path: 'db/tweets', component: WhisperDbTweetsComponent },
  { path: 'db/tweets/analysed', component: WhisperDbAnalysedTweetsComponent },
  { path: 'db/users', component: WhisperDbUsersComponent },
  { path: 'db/companies', component: WhisperDbCompaniesComponent },
  { path: 'db/stocks', component: WhisperDbStocksComponent },
  { path: 'analysis', component: WhisperAnalysisComponent },
  { path: 'ingestion', component: WhisperIngestionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

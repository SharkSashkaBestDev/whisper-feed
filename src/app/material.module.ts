import {
  MatToolbarModule
} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule, MatButtonToggleModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule, MatNativeDateModule, MatProgressBarModule,
  MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule
} from '@angular/material';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import {AmazingTimePickerModule} from 'amazing-time-picker';

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    AmazingTimePickerModule,
    MatProgressBarModule,

    ChartsModule,
    WavesModule,
    MatNativeDateModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    AmazingTimePickerModule,
    MatProgressBarModule,

    ChartsModule,
    WavesModule,
    MatNativeDateModule
  ],
})
export class MaterialModule { }

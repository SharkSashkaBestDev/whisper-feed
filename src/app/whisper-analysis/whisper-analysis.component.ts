import { Component, OnInit } from '@angular/core';
import {WhisperCommonService} from '../services/whisper-common.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {CompanyModel} from '../models/company.model';
import {map, startWith} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StockModel} from '../models/stock.model';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'whisper-analysis',
  templateUrl: './whisper-analysis.component.html',
  styleUrls: ['./whisper-analysis.component.scss']
})
export class WhisperAnalysisComponent implements OnInit {

  companyCtrl = new FormControl();
  filteredCompanies: Observable<CompanyModel[]>;
  companies: CompanyModel[] = [];
  fromDate: Date = new Date();
  fromTime = '';
  toDate: Date = new Date();
  toTime = '';
  loading = false;

  public chartType = 'line';

  public chartDatasets: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Dataset1' },
  ];

  public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  private initialDataset = true;
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  constructor(private commonService: WhisperCommonService,
              private http: HttpClient,
              private datepipe: DatePipe) {
    this.filteredCompanies = this.companyCtrl.valueChanges
      .pipe(
        startWith(''),
        map(company => company ? this._filterCompanies(company) : this.companies.slice())
      );
  }

  ngOnInit() {
    this.fromDate.setFullYear(2014, 9, 9);

    this.loading = true;
    this.commonService.getCompanies()
      .subscribe((companies: CompanyModel[]) => {
        // console.log('companies', companies);
        this.companies = companies;
        this.loading = false;
      });
  }

  public chartClicked(e: any): void { }

  public chartHovered(e: any): void { }

  private _filterCompanies(value: string): CompanyModel[] {
    const filterValue = value.toLowerCase();

    return this.companies.filter(company => company.name.toLowerCase().indexOf(filterValue) === 0);
  }

  tickerChange(event) {
    if (!this.fromDate) {
      return;
    }

    const _labels = [];
    const _datasetRows = [];

    this.fromDate.setHours(+this.fromTime.substring(0, this.fromTime.indexOf(':')));
    this.fromDate.setMinutes(+this.fromTime.substring(this.fromTime.indexOf(':') + 1));
    this.fromDate.setSeconds(0);
    this.toDate.setHours(+this.toTime.substring(0, this.toTime.indexOf(':')));
    this.toDate.setMinutes(+this.toTime.substring(this.toTime.indexOf(':') + 1));
    this.toDate.setSeconds(0);

    const text = event.target.textContent;
    let ticker = text;
    if (text.indexOf('|') > -1) {
      ticker = text.substring(0, text.indexOf('|')).replace(/\s/g, '');
    }

    const selectedCompany = this.companies.find(company => company.ticker.toLowerCase() === ticker.toLowerCase());

    const periodicities = { ticks: '1', '1 min': '2', '5 min': '3', '10 min': '4', '15 min': '5', '30 min': '6', '1 hour': '7',
      '1 day': '8', '1 week': '9', '1 month': '10' };
    const result_filename = `${ticker}`;  // _${this.fromDate.getFullYear()}${this.fromDate.getMonth()}${this.fromDate.getDate()}
    const result_extension = '.csv';
    const result_filename_full = result_filename + result_extension;
    const from_day_of_the_month = this.fromDate.getDate() < 10 ? '0' + this.fromDate.getDate() : '' + this.fromDate.getDate();
    const from_month = this.fromDate.getMonth() < 10 ? '0' + this.fromDate.getMonth() : '' + this.fromDate.getMonth();
    const from_year = '' + this.fromDate.getFullYear();
    const from_date = `${from_day_of_the_month}.${from_month}.${from_year}`;
    const to_day_of_the_month = this.toDate.getDate() < 10 ? '0' + this.toDate.getDate() : '' + this.toDate.getDate();
    const to_month = this.toDate.getMonth() < 10 ? '0' + this.toDate.getMonth() : '' + this.toDate.getMonth();
    const to_year = '' + this.toDate.getFullYear();
    const to_date = `${to_day_of_the_month}.${to_month}.${to_year}`;
    const periodicity = periodicities['30 min'];

    const url = `http://export.finam.ru/${result_filename_full}?market=1&em=16842&code=${ticker}&apply=0&df=${from_day_of_the_month}&` +
      `mf=${from_month}&yf=${from_year}&from=${from_date}&dt=${to_day_of_the_month}&` +
      `mt=${to_month}&yt=${to_year}&to=${to_date}&p=${periodicity}&f=${result_filename}&e=${result_extension}&cn=${ticker}` +
      `&dtf=1&tmf=1&MSOR=1&mstime=on&mstimever=1&sep=1&sep2=1&datf=1&at=1`;

    // console.log('event', event);
    // console.log('fromTime', this.fromTime);
    // console.log('toDate', this.toDate);
    // console.log('toTime', this.toTime);
    // console.log('url', url);
    // console.log('ticker', ticker);
    // console.log('text', text);

    const params = [];
    params.push({ 'ticker': ticker });
    params.push({ 'sort': 'date' });
    params.push({ 'mode': '1' });
    params.push({ 'date': from_year + '.' + from_month + '.' + from_day_of_the_month });
    // params.push({ 'date': this.datepipe.transform(date, 'yyyy-MM-dd'); });

    this.loading = true;
    this.commonService.getStocksForChart(params)
      .subscribe((stocks: StockModel[]) => {
        // console.log('stocks', stocks);
        if (stocks) {
          const datasetRow: any = { data: [], label: ticker };

          stocks.forEach((stock: StockModel) => {
            datasetRow.data.push(stock.open);

            const stockDate: any = stock.date;
            const spaceIndex = stockDate.indexOf(' ');

            _labels.push(stockDate.slice(spaceIndex + 1, spaceIndex + 3 + 3));
          });

          _datasetRows.push(datasetRow);
        }

        if (this.initialDataset) {
          this.chartLabels = _labels;
          this.chartDatasets = _datasetRows;

          this.initialDataset =  false;
        } else {
          this.chartDatasets = _datasetRows;
          // console.log(this.chartDatasets);
        }

        this.loading = false;
      });

  }
}

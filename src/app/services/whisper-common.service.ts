import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {TweetModel} from '../models/tweet.model';
import {StockModel} from '../models/stock.model';
import {API_URL_KEY} from '../constants/common';

@Injectable({
  providedIn: 'root'
})
export class WhisperCommonService {

  constructor(private http: HttpClient) { }

  saveUser(user: UserModel) {
    return this.http.post(localStorage.getItem(API_URL_KEY) + 'users/', user);
  }

  saveStock(stock: StockModel) {
    return this.http.post(localStorage.getItem(API_URL_KEY) + 'stocks/', stock);
  }

  getUsers() {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'users/');
  }

  getUser(id: string) {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'users/' + id);
  }

  deleteUser(id: string) {
    return this.http.delete(localStorage.getItem(API_URL_KEY) + 'users/' + id);
  }

  deleteStock(id: string) {
    return this.http.delete(localStorage.getItem(API_URL_KEY) + 'stocks/' + id);
  }

  deleteUsers(users) {
    return this.http.request('delete', localStorage.getItem(API_URL_KEY) + 'users/', { body: users });
  }

  deleteStocks(stocks) {
    return this.http.request('delete', localStorage.getItem(API_URL_KEY) + 'stocks/', { body: stocks });
  }

  getTweets() {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'tweets/');
  }

  deleteTweets(tweets) {
    return this.http.request('delete', localStorage.getItem(API_URL_KEY) + 'tweets/', { body: tweets });
  }

  deleteCompanies(companies) {
    return this.http.request('delete', localStorage.getItem(API_URL_KEY) + 'companies/', { body: companies });
  }

  deleteAnalysedTweets(analysedTweets) {
    return this.http.request('delete', localStorage.getItem(API_URL_KEY) + 'tweets-analysed/', { body: analysedTweets });
  }

  saveTweets(tweets: TweetModel[]) {
    return this.http.post(localStorage.getItem(API_URL_KEY) + 'tweets', tweets);
  }

  saveStocks(stocks: StockModel[]) {
    return this.http.post(localStorage.getItem(API_URL_KEY) + 'stocks', stocks);
  }

  getTweet(id: string) {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'tweets/' + id);
  }

  getStock(id: string) {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'stocks/' + id);
  }

  getAnalysedTweets() {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'tweets-analysed/');
  }

  getAnalysedTweet(id: string) {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'tweets-analysed/' + id);
  }

  getStatus() {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'info/');
  }

  getStocks(params: any[] = []) {
    let qParamsStr = '';
    if (params && params.length) {
      qParamsStr = '?';
      params.forEach(param => {
        for (const [key, value] of Object.entries(param)) {
          if (!value || value === 'undefined') {
            continue;
          }
          qParamsStr += key +  '=' + value + '&';
        }
      });
      qParamsStr = qParamsStr.slice(0, -1);
    }
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'stocks' + qParamsStr);
  }

  getStocksForChart(params: any[] = []) {
    let qParamsStr = '';
    if (params && params.length) {
      qParamsStr = '?';
      params.forEach(param => {
        for (const [key, value] of Object.entries(param)) {
          if (!value || value === 'undefined') {
            continue;
          }
          qParamsStr += key +  '=' + value + '&';
        }
      });
      qParamsStr = qParamsStr.slice(0, -1);
    }
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'stocks-for-chart' + qParamsStr);
  }

  getStocksCount() {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'stocks-count');
  }

  getCompaniesCount() {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'companies-count');
  }

  getUsersCount() {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'users-count');
  }

  getTweetsCount() {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'tweets-count');
  }

  getAnalysedTweetsCount() {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'tweets-analysed-count');
  }

  getCompanies() {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'companies?downloadCsv=false');
  }

  // Tweeter Ingestion
  ingestTweets(userId: string, count: number, maxId?: string) {
    return this.http.get(localStorage.getItem(API_URL_KEY) +
      'tweeter?userId=' + userId + '&count=' + count + (maxId ? '&maxId=' + maxId : ''));
  }

  lookupTweeterUser(screenName: string) {
    return this.http.get(localStorage.getItem(API_URL_KEY) + 'tweeter/userLookup?screenName=' + screenName);
  }
  // --Tweeter Ingestion
}

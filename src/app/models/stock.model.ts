export class StockModel {
  _id: string;
  ticker: string;
  date: Date;
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
  position: number;

  constructor(_id: string, ticker: string, date: Date, high: number, low: number, open: number, close: number, volume: number) {
    this._id = _id;
    this.ticker = ticker;
    this.date = date;
    this.high = high;
    this.low = low;
    this.open = open;
    this.close = close;
    this.volume = volume;
  }
}

export class CompanyModel {
  _id: string;
  name: string;
  ticker: string;
  exchange: string;
  root: string;
  position: number;

  constructor(_id: string, name: string, ticker: string, exchange: string, root: string) {
    this._id = _id;
    this.name = name;
    this.ticker = ticker;
    this.exchange = exchange;
    this.root = root;
  }
}

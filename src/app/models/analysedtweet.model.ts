import {UserModel} from './user.model';
import {CompanyModel} from './company.model';

export class AnalysedTweetModel {
  _id: string;
  id: string;
  text: string;
  created_at: Date;
  user: UserModel;
  lang: string;
  position: number;
  sentiment: number;
  company: CompanyModel;

  constructor(_id: string, id: string, text: string, created_at: Date, user: UserModel, lang: string, sentiment: number, company: CompanyModel) {
    this._id = _id;
    this.id = id;
    this.text = text;
    this.created_at = created_at;
    this.user = user;
    this.lang = lang;
    this.sentiment = sentiment;
    this.company = company;
  }
}

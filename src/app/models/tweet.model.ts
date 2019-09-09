import {UserModel} from './user.model';

export class TweetModel {
  _id: string;
  id: string;
  text: string;
  created_at: Date;
  user: UserModel;
  lang: string;
  position: number;

  constructor(_id: string, id: string, text: string, created_at: Date, user: UserModel, lang: string) {
    this._id = _id;
    this.id = id;
    this.text = text;
    this.created_at = created_at;
    this.user = user;
    this.lang = lang;
  }
}

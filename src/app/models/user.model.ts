export class UserModel {
  _id: string;
  id: string;
  position: number;
  name: string;
  screen_name: string;
  followers_count: number;
  profile_image_url: string;

  constructor(_id: string, id: string, name: string, screen_name: string, followers_count: number, profile_image_url: string) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.screen_name = screen_name;
    this.followers_count = followers_count;
    this.profile_image_url = profile_image_url;
  }
}

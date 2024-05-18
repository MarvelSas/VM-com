export interface IUser {
  token: string;
  email: string;
  role: string;
}

export class User {
  constructor(
    public email: string,
    public _role: string,
    private _token: string
  ) {}

  get token() {
    return this._token;
  }

  get role() {
    return this._role;
  }
}

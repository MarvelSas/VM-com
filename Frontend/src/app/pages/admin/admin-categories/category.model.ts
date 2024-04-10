export interface ICategory {
  id: number;
  name: string;
  // name?: string;
}

export class Category {
  constructor(private _id, public name) {}

  get id() {
    return this._id;
  }
}

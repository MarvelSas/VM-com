export interface ICategory {
  id: number;
  categoryName: string;
}

export class Category {
  constructor(private _id, public categoryName) {}

  get id() {
    return this._id;
  }
}

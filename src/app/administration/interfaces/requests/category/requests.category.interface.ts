export class CategoryGetInterface {
  rows: number;
  page: number;
  sortName: string;
  sortValue: string;
  searchName: string;
}

export class CategoryPutInterface {
  image: object;
  name: string;
  publication: boolean;
}

export class CategoryGetInterface {
  rows: number;
  page: number;
  sortName: string;
  sortValue: string;
  searchName: string;
}

export class CategoryPutInterface {
  image: any;
  name: string;
  publication: boolean;
}

export class CategoryGetInterface {
  rows: number;
  page: number;
  sortName: string;
  sortValue: string;
  searchName: string;
}

export class CategoryPutInterface {
  name: string;
  nickname: string;
  description: string;
  short: string;
  METAtitle: string;
  METAdescription: string;
  METAkeywords: string;
  publication: boolean;
  image: any;
}

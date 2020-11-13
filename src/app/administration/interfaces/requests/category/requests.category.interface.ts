export class CategoryGetInterface {
  rows: number;
  page: number;
  sortName: string;
  sortValue: string;
  searchName: string;
}

export class CategoryPutInterface {
  image?: string;
  name: string;
  nickname: string;
  sort: number;
  description: string;
  short: string;
  METAtitle: string;
  METAdescription: string;
  METAkeywords: string;
  publication: boolean;
}



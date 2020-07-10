export class StatusGetInterface {
  rows: number;
  page: number;
  sortName: string;
  sortValue: string;
  searchName: string;
}

export class StatusPutInterface {
  name: string;
  code: string;
}

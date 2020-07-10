export class GroupsGetInterface {
  rows: number;
  page: number;
  sortName: string;
  sortValue: string;
  searchName: string;
}

export class GroupPutInterface {
  default: boolean;
  name: string;
  discount: number;
  description: string;
}

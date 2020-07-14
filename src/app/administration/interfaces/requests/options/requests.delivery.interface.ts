export class DeliveryGetInterface {
  rows: number;
  page: number;
  sortName: string;
  sortValue: string;
  searchName: string;
}

export class DeliveryPutInterface {
  publication: boolean;
  payment: string[];
  code: string;
  name: string;
  sort: number;
  description: string;
}

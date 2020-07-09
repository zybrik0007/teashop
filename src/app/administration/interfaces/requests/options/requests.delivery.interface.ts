export class DeliveryGetInterface {
  rows: number;
  page: number;
  sortName: string;
  sortValue: string;
  searchName: string;
}

export class DeliveryPutInterface {
  publication: boolean;
  name: string;
  pseudonym: string;
  sort: number;
  payment: string[];
  description: string;
}

export class PaymentGetInterface {
  rows: number;
  page: number;
  sortName: string;
  sortValue: string;
  searchName: string;
}

export class PaymentPutInterface {
  publication: boolean;
  type: string;
  code: string;
  name: string;
  pseudonym: string;
  description: string;
}

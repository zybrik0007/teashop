export class PriceGetInterface {
  rows: number;
  page: number;
  sortName: string;
  sortValue: string;
  searchName: string;
}

export class PricePutInterface {
  name: string;
  price: number;
}

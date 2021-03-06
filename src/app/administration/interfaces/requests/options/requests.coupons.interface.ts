export class CouponsGetInterface {
  rows: number;
  page: number;
  sortName: string;
  sortValue: string;
  searchName: string;
}

export class CouponsPutInterface {
  publication: boolean;
  code: string;
  type: string;
  value: number;
  dateStart: string;
  dateEnd: string;
  client: number;
  finish: boolean;
}

export class CouponPostInterface {
  id: number;
  publication: boolean;
  code: string;
  type: string;
  value: number;
  dateStart: string;
  dateEnd: string;
  client: number;
  finish: boolean;
}

export class CouponPostIdInterface {
  id: number;
}

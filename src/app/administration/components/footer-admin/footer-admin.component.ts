import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer-admin',
  templateUrl: './footer-admin.component.html',
  styleUrls: ['./footer-admin.component.scss']
})
export class FooterAdminComponent implements OnInit {

  @Input() count: string;
  @Input() page: string;
  @Input() str: string;

  firstPage: number;
  endPage: number;

  pageDis: boolean;

  constructor() { }

  ngOnInit(): void {
    this.FirstPageDisplay(this.count, this.page, this.str);
  }

  FirstPageDisplay(countd, paged, strd) {
    const sum: number = Math.ceil(Number(countd) / Number(strd));
    this.pageDis = sum > 1;
    this.firstPage = paged;
    this.endPage = (sum > 5) ? 5 : sum;
  }


}

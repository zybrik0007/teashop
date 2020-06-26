import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component, DoCheck,
  ElementRef,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {Observable} from "rxjs";

@Component({
  selector: 'app-footer-admin',
  templateUrl: './footer-admin.component.html',
  styleUrls: ['./footer-admin.component.scss']
})
export class FooterAdminComponent implements OnInit {

  @Input() countRows: number;
  @Input() rows: number;

  firstPage: number;
  endPage: number;
  activePage: number;
  arrayPage: number[];
  pageDis: boolean;

  constructor(
    el: ElementRef,
    r: Renderer2
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.FirstPageDisplay(this.countRows, this.rows);
  }

  FirstPageDisplay(countd, strd) {
    const sum: number = Math.ceil(countd / strd);
    this.pageDis = sum > 1;
    this.firstPage = 1;
    this.endPage = (sum > 5) ? 5 : sum;
    this.activePage = this.firstPage;
    const arrd = [];
    for (let i = this.firstPage; i <= this.endPage; i++) {
      arrd.push(i);
    }
    this.arrayPage = arrd;
    const ac =  document.getElementsByClassName('page');
    this.activePage = 1;
  }

  UpdatePage(event) {
    this.activePage = event.target.innerText;
    console.log(event);
  }

}

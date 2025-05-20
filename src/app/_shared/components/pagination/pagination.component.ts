import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() count: number;
  @Input() limit: number;
  @Input() pageSize = 7;
  @Input() page: number;
  @Input() queryParams: any;
  @Input() mode: string;
  @Input() fragment: string;
  
  baseURL: string;

  pages: [number, string][] = [];


  constructor(
    private route: Router

  ) { }

  ngOnInit() {
    if (this.mode == 'queryParams') {
      this.baseURL = this.route.url.split('?')[0];
    }
    else {
      this.baseURL = this.route.url.split('/').slice(0, -1).join('/') + '/';
    }
    let pageCount = Math.ceil(this.count / this.limit);

    let startPage = this.page - (this.pageSize - 1) / 2;
    let endPage = this.page + (this.pageSize - 1) / 2;

    if (endPage > pageCount) {
      startPage = pageCount - this.pageSize + 1;
      endPage = pageCount;
    }
    if (startPage <= 1) {
      startPage = 1;
      endPage = this.pageSize > pageCount ? pageCount : this.pageSize;
    }
    if (startPage > 1) {
      this.pages.push([startPage - 1, "<<"]);
    }
    for (let i = startPage; i <= endPage; i++) {
      this.pages.push([i, i.toString()]);
    }
    if (endPage < pageCount) {
      this.pages.push([endPage + 1, ">>"]);
    }
  }

  getPageQueryParams(page) {
    return {
      ...this.queryParams, page: page
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css']
})
export class StoresListComponent implements OnInit {
  @Input() stores;
  @Input() placeName;
  @Input() pagQueryParams;
  @Input() pagMode;
  @Input() page: number;
  @Input() pagFragment: string;

  constructor() { }

  ngOnInit() {
  }

}

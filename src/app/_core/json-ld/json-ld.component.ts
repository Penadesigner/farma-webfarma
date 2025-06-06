import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-json-ld',
  templateUrl: './json-ld.component.html',
  styleUrls: ['./json-ld.component.css']
})
export class JsonLdComponent implements OnInit {
  @Input() schema: any;

  constructor() { }

  ngOnInit() {
  }

}

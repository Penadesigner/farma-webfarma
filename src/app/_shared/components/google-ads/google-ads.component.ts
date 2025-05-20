import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-google-ads',
  templateUrl: './google-ads.component.html',
  styleUrls: ['./google-ads.component.css']
})
export class GoogleAdsComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    setTimeout(() => {
      try {
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
        // (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("error");
      }
    }, 2000);
  }

}

import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PrepareUriPipe } from '../_shared/pipes/prepare-uri.pipe';

@Component({
  selector: 'app-health-terms-index',
  templateUrl: './health-terms-index.component.html',
  styleUrls: ['./health-terms-index.component.css']
})
export class HealthTermsIndexComponent implements OnInit {
  terms: string[];
  letter: String;
  page: number;
  count: number;
  limit: number;
  pages: [number, string][] = [];
  alphabet: String[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  constructor(
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private title: Title,
    private meta: Meta,
    public prepareUriPipe: PrepareUriPipe
  ) { }

  ngOnInit() {
    this.title.setTitle(`Saúde de A a Z | Farmaciaai - As farmácias mais próximas em um só lugar`);
    let termsPage = this.route.snapshot.data.termsPage;
    if (termsPage) {
      this.terms = termsPage.result;
      this.count = termsPage.count;
      this.limit = termsPage.limit;
      this.letter = this.route.snapshot.paramMap.get('letter');
      this.page = parseInt(this.route.snapshot.paramMap.get('page'));
      this.meta.updateTag({
        name: "description",
        content: `Doenças e Sintomas iniciados com a letra '${this.letter}'. Leia a bula e compare preços de medicamentos nas farmácias mais próximas de você.`
      });

      setTimeout(() => {
        // this.viewportScroller.setOffset([0, 2]);
        this.viewportScroller.scrollToAnchor('active-letter');
      }, 100)
    }
  }
}

import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-stores-rank-table',
  templateUrl: './stores-rank-table.component.html',
  styleUrls: ['./stores-rank-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoresRankTableComponent implements OnInit {
  @Input()
  stores: any[];

  constructor() { }

  ngOnInit() {
  }

  getBadgeStyle(category: string): string {
    switch (category) {
      case "PRATA": return "fa fa-2x fa-medal text-my-silver";
      case "OURO": return "fa fa-2x fa-medal text-my-gold";
      case "BONZE": return "fa fa-2x fa-medal text-my-bronze";
      case "BASICO": return "fa fa-2x fa-badge-check text-my-blue";
      case "NOVATO": return "fal fa-2x fa-badge text-my-blue";
      default: return "fal fa-2x fa-badge text-my-blue";
    }
  }

}

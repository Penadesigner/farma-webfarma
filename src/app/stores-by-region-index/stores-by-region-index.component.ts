import { Component, OnInit } from '@angular/core';
import { UserAddressService } from '../_shared/services/user-address.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-stores-by-region-index',
  templateUrl: './stores-by-region-index.component.html',
  styleUrls: ['./stores-by-region-index.component.css']
})
export class StoresByRegionIndexComponent implements OnInit {
  states: Array<[string, string]>;
  statesCol1 = [];
  statesCol2 = [];

  constructor(
    private userAddressService: UserAddressService,
    private title: Title,
    private meta: Meta,
  ) { }

  ngOnInit() {
    this.title.setTitle('Encontre farmácias próximas de você em todo o Brasil');
    this.meta.updateTag({
      name: "description",
      content: `As farmácias próximas de você em todos os estados do Brasil. Compare preços e compre medicamentos online`
    })

    this.states = this.userAddressService.getStatesList();
    this.states.forEach((state, i) => {
      if (i <= this.states.length / 2)
        this.statesCol1.push(state);
      else
        this.statesCol2.push(state);
    })
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddressComponent } from 'src/app/_shared/components/modal-address/modal-address.component';
import { Address } from 'src/app/_shared/models/address.model';
import { UserAddressService } from 'src/app/_shared/services/user-address.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  address: Address;
  isCollapsed: boolean;
  fragment: string;
  isSearchCollapsed: boolean;

  constructor(
    private userAddressService: UserAddressService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.userAddressService.currentAddress.subscribe((address) => this.address = address);
    this.isCollapsed = true;
    this.isSearchCollapsed = true;
  }

  onClickCep() {
    this.modalService.open(ModalAddressComponent);
  }

}

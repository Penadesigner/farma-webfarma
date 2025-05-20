import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from '../../models/address.model';
import { UserAddressService } from '../../services/user-address.service';

@Component({
  selector: 'app-modal-address',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.css']
})
export class ModalAddressComponent implements OnInit {
  cep: string;
  address: Address;
  loaded: boolean;
  loading: boolean;
  errorMsg: string;

  constructor(public activeModal: NgbActiveModal
    , private userAddressService: UserAddressService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.loaded = false;
    this.userAddressService.currentAddress.subscribe((address) => this.address = address);
  }

  submitAddress() {
    this.userAddressService.updateCurrentAddress(this.address);
    this.activeModal.close(this.activeModal);
  }

  onKeyupCep() {
    if (this.cep && this.cep.length == 8) {
      this.errorMsg = undefined;
      this.loading = true;
      this.loaded = false;
      this.userAddressService.getAddressByCep(this.cep).subscribe((address: Address) => {
        this.loading = false;
        this.address = address;
        if (address) {
          this.loaded = true;
        }
        else {
          this.errorMsg = "CEP não encontrado."
        }
      });
    }
  }
}

import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbTooltip, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { merge, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ModalAddressComponent } from '../_shared/components/modal-address/modal-address.component';
import { Address } from '../_shared/models/address.model';
import { Product } from '../_shared/models/product.model';
import { PrepareUriPipe } from '../_shared/pipes/prepare-uri.pipe';
import { SearchService } from '../_shared/services/search.service';
import { UserAddressService } from '../_shared/services/user-address.service';
import { UserSessionService } from '../_shared/services/user-session.service';

declare let ga: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterViewInit {
  address: Address;
  model: string;
  selectedItem: Product;
  searching = false;
  result: any;
  errorMsg: string = "";
  search$ = new Subject<string>();

  @ViewChild("inputKeywords", { static: false })
  private inputKeywords: ElementRef;

  @ViewChild("inputTooltip", { static: false })
  private inputTooltip: NgbTooltip


  constructor(
    private modalService: NgbModal,
    private userAddressService: UserAddressService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private prepareUri: PrepareUriPipe,
    private deviceDetectorService: DeviceDetectorService,
    private userSessionService: UserSessionService
  ) { }

  ngOnInit() {
    let oneSignalID = this.route.snapshot.queryParamMap.get('oneSignalID');
    if (oneSignalID) {
      this.userSessionService.setOneSignalID(oneSignalID);
    }

    this.userAddressService.currentAddress
      .subscribe((address) => {
        this.address = address;
        if (address) {
          return this.userAddressService.getNearAdvertisers(address)
        }
        return of(undefined)
      })
  }
  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment == "input-keywords" && this.inputTooltip) {
        this.scrollToSearch(true);
        this.inputTooltip.placement = 'bottom-left';
        this.inputTooltip.open();
      }
    })
  }

  onFocusSearch() {
    if (this.deviceDetectorService.isMobile()) {
      this.scrollToSearch();
    }
  }

  onClickMyLocation() {
    this.openAddressModal();
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(300), distinctUntilChanged());
    const search$ = this.search$;
    return merge(debouncedText$, search$).pipe(
      tap(() => this.searching = true),
      switchMap(term =>
        this.searchService.autocomplete(term, this.address).pipe(
          tap(() => this.errorMsg = undefined),
          tap((result) => this.result = result),
          catchError(() => {
            this.errorMsg = 'Erro de conexão. Por favor, tente novamente';
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )
  }

  formatter = (x: Product) => x.nomeCompleto;

  onSubmit() {
    if (this.model && this.model.trim().length >= 3) {
      this.router.navigate(['/busca'], { queryParams: { termos: this.model } })
    }
    else {
      this.errorMsg = "Ops! Precisamos de pelo menos 3 letras para buscar."
    }
    // }
    // else {
    //   this.errorMsg = 'Verifique se o nome do produto foi digitado corretamente';
    //   ga('create', 'UA-92160174-2', 'auto');
    //   ga('send',
    //     {
    //       hitType: 'event',
    //       eventCategory: 'Busca',
    //       eventAction: 'ProdutoNaoEncontrado',
    //       eventLabel: 'Produto não encontrado',
    //       'dimension1': this.model,
    //       eventValue: 1
    //     });
    // }
  }

  onSelectItem(e: NgbTypeaheadSelectItemEvent) {
    this.selectedItem = e.item as Product;
    this.router.navigate(
      ['/detalhes',
        this.prepareUri.transform(this.selectedItem.nomeCompleto),
        this.selectedItem.ean],
      { replaceUrl: this.deviceDetectorService.isMobile() });
  }

  private openAddressModal() {
    this.modalService.open(ModalAddressComponent).result.then((result) => {
      if (this.address) {
        this.inputKeywords.nativeElement.focus();
      }
    })
  }

  private scrollToSearch(force = false) {
    if (this.route.snapshot.fragment != 'busca') {
      this.router.navigate(['./'], {
        fragment: 'busca'
      });
    }
    if (force || this.deviceDetectorService.isMobile()) {
      setTimeout(() => {
        // this.viewportScroller.setOffset([0, 2]);
        this.viewportScroller.scrollToAnchor('input-keywords');
      }, 100)
    }
  }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

}

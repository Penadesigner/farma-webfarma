import { Component, OnInit } from '@angular/core';
import { ContactService } from '../_shared/services/contact.service';
import { ContactMessage } from '../_shared/models/contact-message';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewportScroller } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contato-form',
  templateUrl: './contato-form.component.html',
  styleUrls: ['./contato-form.component.css']
})
export class ContatoFormComponent implements OnInit {
  model: ContactMessage = new ContactMessage();
  loading: boolean = false;


  constructor(
    private contactService: ContactService,
    private viewportScroller: ViewportScroller,
    private modalService: NgbModal) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm, content) {
    this.loading = true;
    this.contactService.sendMessage(this.model).subscribe(() => {
      this.loading = false;
      form.resetForm();
      this.viewportScroller.scrollToPosition([0, 0]);
      let modal = this.modalService.open(content);
      setTimeout(() => {
        modal.close();
      }, 3500)
    });
  }

}

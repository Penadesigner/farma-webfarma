import { Component, HostListener, OnInit } from '@angular/core';
import { SpinnerService } from './_shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'farmaciaai-angular';

  public constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
  }

  @HostListener('click', ['$event.target', '$event.defaultPrevented'])
  onClick(target: Element, defaultPrevented: boolean) {
    let current: Element = target;
    while (!defaultPrevented && current != null) {
      if (current.tagName == 'A' && current.getAttribute('href')) {
        // console.log('EVENT STARTED');
        this.spinnerService.onStarted('a-href-navigation');
        return;
      }
      current = current.parentElement;
    }
    return;
  }
}


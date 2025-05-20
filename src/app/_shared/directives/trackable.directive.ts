
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { TrackService } from '../services/track.service';
@Directive({
  selector: '[appTrackable]'
})
export class TrackableDirective {
  @Input('appTrackData') data: any;
  @Input('appTrackName') eventName: any;
  @Input('appTrackType') eventType: any;

  el: ElementRef
  constructor(
    el: ElementRef,
    private trackService: TrackService
  ) {
    this.el = el;
  }
  @HostListener('appTrack', ['$event.detail'])
  onAppTrack(detail) {

    let trackData = {
      eventName: this.eventName,
      eventType: this.eventType,
      page: detail.page
    }
    if (this.data) {
      trackData = { ...trackData, ...this.data }
    }

    this.trackService.track(trackData).subscribe();
  }
}


import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    constructor(public spinnerService: SpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // emit onStarted event before request execution
        this.spinnerService.onStarted(req);

        return next.handle(req).pipe(
            finalize(() => this.spinnerService.onFinished(req)
            )
        );
    }
}
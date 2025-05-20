import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //https://backend.webfarmas.com.br/user/sendmessage
  endpoint = environment.apiUrl + '/user/sendmessage';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  sendMessage(message: any) {
    if (!message) {
      return of([])
    }
    return this.http
      .post(this.endpoint, message, this.httpOptions).pipe(
        map((data: any) => {
          // console.log(data);
          return data.response
        })
      );
  }
}

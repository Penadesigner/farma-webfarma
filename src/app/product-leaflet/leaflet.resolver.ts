import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { of } from 'rxjs';
import { MedDetails } from '../_shared/models/med-details.model';

@Injectable()
export class LeafletResolver implements Resolve<any> {
  FOLDER = 'bulas_seo_html_registro';
  BUCKET = 'farmaciaai-bulas';
  REGION = 'sa-east-1';

  constructor(
    private http: HttpClient
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    let reg = route.paramMap.get('register');
    return this.http.get(
      `https://${this.BUCKET}.s3-${this.REGION}.amazonaws.com/${this.FOLDER}/${reg}/index.html`,
      { responseType: 'text' }
    );
  }
}
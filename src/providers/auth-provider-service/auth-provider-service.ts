import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import { global } from "../../app/global";
import {Nav,Content} from 'ionic-angular';
import { ViewChild } from '@angular/core';

@Injectable()
export class AuthProviderServiceProvider {

  @ViewChild(Nav) nav: Nav;
  @ViewChild(Content) content: Content;

  constructor(public http: Http) {
    console.log('Hello AuthProviderServiceProvider Provider');
  }

  postData(postedData,methodName)
  {
    return new Promise((resolve,reject) =>{
        let headers = new Headers();
        let api = global.apiUserUrl;

        if (postedData != null)
        {
          this.http.post(api+methodName, JSON.stringify(postedData), {headers: headers}).subscribe(res =>{
              resolve(res.json());
          }, (err) =>{
              reject('error : '+err);
          });
        }
        else
        {
          this.http.get(api+methodName).subscribe(res =>{
              resolve(res.json());
          }, (err) =>{
              reject(err);
          });
        }
    })
  }

}

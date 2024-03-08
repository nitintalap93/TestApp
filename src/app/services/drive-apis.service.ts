import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DriveAuthenticationService } from './drive-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DriveAPIsService {

  baseUrl: string = "https://www.googleapis.com/drive/v3/files";
  fields: string = "files/name, files/mimeType, files/size, files/webContentLink, files/webViewLink,files/id,files/createdTime, files/modifiedTime, files/description";
  headers = {'Authorization': ''};
  authTokenResponse = {"token": "","expiry":3597};

  constructor(private http: HttpClient, private auth: DriveAuthenticationService) {
    this.getToken();    
  }

  getFileList(): Observable<any> { 
    console.log('--------------Token-----------');
    console.log(this.headers);
    console.log('--------------Token-----------');
    return this.http.get(this.baseUrl + "?fields="+ this.fields, {
      headers: this.headers 
    });
  }

  // downloadFile(fileId:string): Observable<any> { 
  //   console.log('--------------Token-----------');
  //   console.log(this.headers);
  //   console.log('--------------Token-----------');
  //   return this.http.get(this.baseUrl + "/" +fileId, {
  //     headers: this.headers 
  //   });
  // }

  public getToken() {
    this.auth.getAccessToken().pipe(map(data => {
      console.log('--------------pipe-----------');
      console.log(data);
      this.authTokenResponse.token = data["access_token"].toString();
      this.authTokenResponse.expiry = data["expires_in"];
      this.headers.Authorization = 'Bearer '+ this.authTokenResponse.token;            
    })).subscribe({
      next(response) {
        console.log("Auth Token Recieved");
      }, error(err) {
        console.log('Auth Token Failure');
      }, complete() {
        console.log('Auth token fetching completed');        
      }
    });
  }
}

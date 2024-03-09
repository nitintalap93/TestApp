import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DriveAuthenticationService } from './drive-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DriveAPIsService {

  baseUrl: string = "https://www.googleapis.com/drive/v3/files";
  resumableUploadUrl: string = "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable";

  fields: string = "files/name, files/mimeType, files/size, files/webContentLink, files/webViewLink,files/id,files/createdTime, files/modifiedTime, files/description";
  headers = { 'Authorization': '' };
  authTokenResponse = { "token": "", "expiry": 3597 };

  private publicDriveId : string = "1g4MauXjsoKffu_pA8k-BZpysgA2U9GhN";

  constructor(private http: HttpClient, private auth: DriveAuthenticationService) {
    this.getToken();
  }

  getFileList(): Observable<any> {
    console.log('--------------Token-----------');
    console.log(this.headers);
    console.log('--------------Token-----------');

    if(this.headers.Authorization == ''){
      this.getToken();
    }

    return this.http.get(this.baseUrl + "?fields=" + this.fields, {
      headers: this.headers
    });
  }

  getResumableURL(fileName: string, mimeType: string, selectedFolder:string): Observable<any> {
    return this.http.post(this.resumableUploadUrl, {
      'name': fileName,
      'mimeType': mimeType,
      'parents': [this.publicDriveId]
    }, {
      headers: this.headers,
      observe: 'response'
    });
  }

  uploadFile(resumableUrl:string, file: File): Observable<any>{
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);

    return this.http.put(resumableUrl, formData, { headers: this.headers });
  }

  uploadFileToFolder(resumableUrl:string, file: File): Observable<any>{
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);

    return this.http.post(resumableUrl, formData, { headers: this.headers });
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
      this.headers.Authorization = 'Bearer ' + this.authTokenResponse.token;
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

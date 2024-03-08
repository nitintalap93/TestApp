import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriveAuthenticationService {

  baseUrl: string = "https://www.googleapis.com/oauth2/v4/token";
  requestBody = {
    'client_id': '1060386232885-s75io32tnfseth2ncqgb1uga8u7u2ema.apps.googleusercontent.com',
    'client_secret': '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',
    'refresh_token': '1//044iSnjXj_12TCgYIARAAGAQSNwF-L9IrU2CZwQpcNCbZXGd4c1ro9kAFyXClDoKQqYJ3r7oiYGgRGBJIUulARIZ6O5TRfehdxq4',
    "grant_type": "refresh_token"
  }

  constructor(private http: HttpClient) { }

  getAccessToken(): Observable<any> {
    return this.http.post<any>(this.baseUrl, this.requestBody);
  }
}

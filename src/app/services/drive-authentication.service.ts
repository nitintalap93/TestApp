import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriveAuthenticationService {

  baseUrl: string = "https://oauth2.googleapis.com/token";
  requestBody = {
    'client_id': '1060386232885-s75io32tnfseth2ncqgb1uga8u7u2ema.apps.googleusercontent.com',
    'client_secret': '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',
    'refresh_token': '1//048rNBb0GIZCdCgYIARAAGAQSNwF-L9Ir9X348FyA1Zk43HlQN2DWKNnHrE3sUcV9SmDhu-CR-a1J-ji-qqCBN2rEdbaXK16Odto',
    'grant_type': 'refresh_token'
  }

  constructor(private http: HttpClient) { }

  getAccessToken(): Observable<any> {
    return this.http.post<any>(this.baseUrl, this.requestBody);
  }
}

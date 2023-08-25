import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GmailLabel } from './gmail-label';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient) { }


  listLabels(userId: string): Observable<GmailLabel[]> {
    return this.http.get<GmailLabel[]>(`https://gmail.googleapis.com/gmail/v1/users/${userId}/labels`)
  }


  createLabel(userId: string, labelName: string): Observable<GmailLabel> {
    let label = 
    {
      "name": labelName,
    }
    ;
    return this.http.post<GmailLabel>(`https://gmail.googleapis.com/gmail/v1/users/${userId}/labels`, JSON.stringify(label));
  }

  deleteLabel(userId: string, labelId: string): Observable<any> {
    return this.http.delete(`https://gmail.googleapis.com/gmail/v1/users/${userId}/labels/${labelId}`);
  }
}

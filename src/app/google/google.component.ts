import { Component, NgZone } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { GoogleService } from './google.service';
import { Observable, filter, map, switchMap } from 'rxjs';
import { GmailLabel } from './gmail-label';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.less',]
})
export class GoogleComponent {

  label: string;
  gmailUserLabels: GmailLabel[] = [];

  constructor(private authService: AuthService, 
    private googleService: GoogleService,
    private notification: NzNotificationService,
    private zone:NgZone) { }

  logout() {
    this.authService.logout();
  }

  fetchGmailLabels() {
    this.authService.userIdForConfig('google').pipe(
      switchMap(userId => {
        return this.googleService.listLabels(userId).pipe(
          map((val: any) => val.labels)
        )
      }),
    ).subscribe(data => {
      this.gmailUserLabels = data.filter((val: GmailLabel) => val.type === 'user');
    });
  }

  createGmailLabel(newLabel: string) {
    const addingLabel: GmailLabel = 
    {
    id: "Label_16",
    name: "dasdsa",
    messageListVisibility: "show",
    labelListVisibility: "labelShow",
    type: "user"
  };

  this.gmailUserLabels.push(addingLabel);

    // this.authService.userIdForConfig('google').pipe(
    //   switchMap(userId => {
    //     return this.googleService.createLabel(userId, newLabel)
    //   }),
    // ).subscribe(data => {
    //   console.log("create Gmail label", data);
    //   this.gmailUserLabels.push(data);
    //   console.log("array after push", this.gmailUserLabels)
    //   this.notification.success("Created Label", newLabel);
    // });

    this.label = '';
  }

  deleteGmailLabel(label: GmailLabel) {
    this.authService.userIdForConfig('google').pipe(
      switchMap(userId => {
        return this.googleService.deleteLabel(userId, label.id)
      }),
    ).subscribe(data => {
      this.gmailUserLabels = this.gmailUserLabels.filter(l => l != label);
      this.notification.success("Deleted Label", label.name);
    });
    
  }


}

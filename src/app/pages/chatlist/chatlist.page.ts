import { ChatService } from './../../services/chat.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.page.html',
  styleUrls: ['./chatlist.page.scss'],
})
export class ChatlistPage implements OnInit {
  chats: any;
  showSpinner = true;

  constructor(private profileservice: ProfileService, private chatservice: ChatService) { }

  ngOnInit() {
    this.profileservice.getid().then(res => {
      this.profileservice.getProfileAsObservable(res).subscribe(
        result => {
          this.chatservice.getChats(result.userId,result.role).subscribe(final => {
            this.chats = final;
            this.showSpinner = false;
          });
        }
      );
    });
    };
}



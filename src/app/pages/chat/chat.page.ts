import { IonContent } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, AfterViewChecked, AfterViewInit {

  @ViewChild('input', { read: ElementRef }) msgInput: ElementRef;
  @ViewChild('scrollMe') private myScrollContainer: IonContent;


chat: any[];
chatId: string;
newMsg='';
currentUserId ;
showSpinner = true;



  constructor(private authService: AuthService,
     private chatservice: ChatService,
     private route: ActivatedRoute) { }




  ngOnInit() {
  this.route.paramMap.subscribe((params: ParamMap) => {
    this.chatId = params.get('id');
    this.chatservice.getChatMessages(this.chatId).subscribe( data => {
      console.log(data);
      this.chat = data;
      this.authService.getUid().then(res => {
        this.currentUserId = res;
        this.showSpinner = false;
      });
    //  const currentPosition = this.myScrollContainer.nativeElement.scrollTop;
     // this.myScrollContainer.nativeElement.scrollTop = currentPosition;
    });
  });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
}

  resize() {
    this.msgInput.nativeElement.style.height = this.msgInput.nativeElement.scrollHeight + 'px';
  }

  sendMessage() {
    this.chatservice.sendMessage(this.chatId,this.newMsg,this.currentUserId).then(() => {
      this.newMsg = '';
      this.myScrollContainer.scrollToBottom();
    });
  }

  scrollToBottom(): void {

 //   this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;

}
}

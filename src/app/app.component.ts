import { Component } from '@angular/core';
// inyectamos para trabajar con el logout
import { ChatService } from './providers/chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FireChat';
  constructor(public chatService: ChatService) {

  }
}

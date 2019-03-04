import { Component, OnInit } from '@angular/core';
import { ChatService } from  '../../providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public chatService: ChatService) { }

  ngOnInit() {
  }

  ingresar(proveedor: string) {
    console.log(proveedor);
    //Llamamos el metodo login que esta en el servicio
    this.chatService.login(proveedor);
  }

}

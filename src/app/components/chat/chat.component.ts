import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mensaje: string = '';

  constructor(public chatService: ChatService) {
    //Nos suscribimos
    this.chatService.cargarMensajes()
    //Recibimos un mensaje de tipo arreglo, para que lo maneje que es arreglo
      .subscribe((mensaje:any[]) => {
        //Vemos en pantalla el objeto que tenemos en firebase.
        console.log(mensaje);
      });
  }

  ngOnInit() {
  }

  enviar_mensaje(){
    console.log(this.mensaje);
  }

}

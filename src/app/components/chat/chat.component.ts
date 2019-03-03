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
    // Nos suscribimos y manejamos la logica en el servicio
    this.chatService.cargarMensajes().subscribe();
  }

  ngOnInit() {
  }

  enviar_mensaje(){
    console.log(this.mensaje);
    // Antes de usar el funcion agregarMensaje debemos asegurarnos que haya un mensaje
    if (this.mensaje.length === 0) { // No recibimos mensaje
      return; // No se realiza ninguna accion
    } else {
      // Guardamos el mensaje, aca deberia de guardar los datos en firebase y mostrase en el HTML y la consola
      this.chatService.agregarMensaje(this.mensaje)
      // Opcional: avismos que se guardo el mensaje y borramos la caja de texto a vacio '' o que dio un error.
        //
          .then(() => this.mensaje = '')
          .catch( () => console.error('Error al enviar el mensaje', err)); // el err es el error que maneja firebase
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mensaje: string = '';
  // Nos cremos un 'elemento para que siempre este apuntando abajo cuando enviamos un mensaje, ocupamos el OnInit para cuando se cree el HTML
  elemento: any
  constructor(public chatService: ChatService) {
    // Nos suscribimos y manejamos la logica en el servicio
    this.chatService.cargarMensajes().subscribe( () => {
      // Ponemos un timeout porque cuando recargamos la pagina aveces no funciona el scroll para poner el foco al final por la velocidad
      // de carga de Angular
      setTimeout( () => {
        // Mueve el foco al final
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });
  }

  ngOnInit() {
    // hacemos referencia al elemento app-mensajes HTML
    this.elemento = document.getElementById('app-mensajes');
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

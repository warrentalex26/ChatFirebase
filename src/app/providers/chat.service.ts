import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';

@Injectable()
// NOTA: UN SERVICIO SE EJECUTA EN EL MOMENTO QUE ES INYECTADO - IMPORTANTE POR ESO CREAMOS EL METODO CREARMENSAJE PARA OCUPARLO VARIAS VECES
export class ChatService {
  // Lo ocupamos para leer una coleccion en particular
  private itemsCollection: AngularFirestoreCollection<any>;
  // Lo trabajamos con arreglo
  public chats: any = [];

  constructor(private afs: AngularFirestore) { }

  cargarMensajes() {
    // Recibe un tipo any y el nodo del chat
    // Mandamos un query a partir del ref para ordenar los chat en este caso por fecha y enviamos el desc para orderarlos descendentes
    // Ocupamos limit para cargar los ultimos 5 mensajes porque no es viable si hay mas de 1000 mensajes
    this.itemsCollection = this.afs.collection<any>('chats', ref => ref.orderBy('fecha', 'desc')
      .limit(5));
    // Con esto estamos pendientes de lo que suceda en ese nodo en este caso 'chats'.
    // usamos map para trabajar con un observable y transformar y regresar algo en el cual nosotros nos suscribimos
    return this.itemsCollection.valueChanges().pipe(map( mensaje => {
      console.log(mensaje);
      // limpiamos los chats
      this.chats = [];
      //barremos los elementos del array
      for (let msj of mensaje) {
        // lo insertamos en la primera posicion siempre para ordenarlos
        this.chats.unshift(msj);
      }
      // this.chats = mensaje; // Ahora con el chats podemos trabaja en el HTML
    }));
  }

  //Recibimos el texto que deseamos enviar
  agregarMensaje(texto :string) {
    // Necesitamos enviar el objeto a firebase para grabarlo, NOS FALTA EL UID DEL USUARIO
    let mensaje: Mensaje = {
      nombre : 'demo',
      mensaje: texto,
      fecha: new Date().getTime()
    };
    // Guardamos la informacion en firebase
    return this.itemsCollection.add(mensaje);

  }

}

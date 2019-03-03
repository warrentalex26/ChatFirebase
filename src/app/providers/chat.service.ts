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

  cargarMensajes(){
    // Recibe un tipo any y el nodo del chat
    this.itemsCollection = this.afs.collection<any>('chats');
    // Con esto estamos pendientes de lo que suceda en ese nodo en este caso 'chats'.
    // usamos map para trabajar con un observable y transformar y regresar algo en el cual nosotros nos suscribimos
    return this.itemsCollection.valueChanges().pipe(map( mensaje => {
      console.log(mensaje);
      // Llenamos el grupo de chats que declaramos al inicio
      this.chats = mensaje; // Ahora con el chats podemos trabaja en el HTML
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

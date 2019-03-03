import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
    // Regresamos con return para suscribirnos en otro lugar(chat.component.ts)
    return this.itemsCollection.valueChanges();
  }

}
